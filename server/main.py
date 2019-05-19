import aiohttp
from aiohttp import web
import asyncio
import aiohttp_cors
import os
import json

from db import db
from classes import *


async def get_events_handler(request): # request is BaseRequest
    query = request.query # query is MultiDictProxy
    with db_session:
        relevant_event_ids = set(select(x.id for x in Event)[:])
        if 'latitude' in query and 'longitude' in query and 'radius' in query:
            ids = get_event_ids_in_radius(Event, query['latitude'], query['longitude'], float(query['radius']))
            relevant_event_ids = relevant_event_ids.intersection(ids)
        if 'time_start' in query and 'time_end' in query:
            ids = get_event_ids_in_interval(Event, get_time(query['time_start']), get_time(query['time_end']))
            relevant_event_ids = relevant_event_ids.intersection(ids)
        if 'categories' in query  and not query['categories']:
            ids = get_event_ids_in_categories(Event, query['categories'])
            relevant_event_ids = relevant_event_ids.intersection(ids)
        # if not relevant_event_ids:
        #     relevant_event_ids = set(select(x.id for x in Event)[:])
        events = Event.select(lambda x: x.id in relevant_event_ids)[:]
        distances = [geodesic((event.location.latitude, event.location.longitude), (query['user_lat'], query['user_long'])).m 
                     for event in events]
        events_dict = json.loads(events_to_json(events))
        for i, event_dict in enumerate(events_dict):
            event_dict['distance'] = distances[i]
        events_json = json.dumps(events_dict)
    response = web.Response(text=events_json)
    return response

async def get_authors_handler(request):
    query = request.query
    author_id = query.get('id')
    with db_session:
        author_events = list(select(x.events for x in Author if x.id == author_id)[:])
        author_events_json = events_to_json(author_events)
    response = web.Response(text=author_events_json)
    return response

async def get_categories_handler(request): 
    query = request.query
    return web.Response(text=json.dumps(Categories))

async def post_handler(request):
    request_json = await request.json()
    add_event(request_json)
    response = web.Response()
    return response

def main():
    app = web.Application()

    app.router.add_route("GET", "/api/events", get_events_handler)
    app.router.add_route("GET", "/api/authors", get_authors_handler)
    app.router.add_route("GET", "/api/categories", get_categories_handler)
    app.router.add_route("POST", "/api/events", post_handler)

    cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
            allow_methods="*",
        )
    })

    for route in list(app.router.routes()):
        cors.add(route)

    web.run_app(app, port=os.environ.get("PORT", 8080))

if __name__ == "__main__":
    db.generate_mapping(create_tables=True)
    main()
