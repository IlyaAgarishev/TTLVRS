import aiohttp
import asyncio
from aiohttp import web
from db import db
from classes import *
import json

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
        events_json = json.dumps(list(map(lambda x: x.event_to_dict(), events)), default=json_serial)
    response = web.Response(text=events_json)
    return response

async def post_handler(request):
    request_json = await request.json()
    add_event(request_json)
    response = web.Response()
    return response

def main():
    app = web.Application()
    app.add_routes([web.get('/api/events', get_events_handler)])
    app.add_routes([web.post('/api/events', post_handler)])

    web.run_app(app)
    print("======= Running ======")

if __name__ == "__main__":
    db.generate_mapping(create_tables=True)
    main()
