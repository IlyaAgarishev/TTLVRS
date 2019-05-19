import aiohttp
from aiohttp import web
import asyncio
import aiohttp_cors
import os

from db import db
from classes import *

# http://10.34.34.56:8080/api/events?latitude=56.8378024&longitude=60.6030364&radius=500&time_start=2019-05-21T00:00:00&time_end=2019-06-01T00:00:00
# http://10.34.34.56:8080/api/authors?id=1

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
        events = Event.select(lambda x: x.id in relevant_event_ids)[:]
        events_json = events_to_json(events)
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

async def post_handler(request):
    request_json = await request.json()
    add_event(request_json)
    response = web.Response()
    return response

def main():
    app = web.Application()

    app.router.add_route("GET", "/api/events", get_events_handler)
    app.router.add_route("GET", "/api/authors", get_authors_handler)
    app.router.add_route("POST", "/api/events", post_handler)

    cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
    })

    for route in list(app.router.routes()):
        cors.add(route)

    web.run_app(app, port=os.environ.get("PORT", 8080))

if __name__ == "__main__":
    db.generate_mapping(create_tables=True)
    main()
