import aiohttp
import asyncio
from aiohttp import web
from db import db
from classes import *
import json

async def get_handler(request):
    query = request.query
    with db_session:
        events = Event.select()[:]
        if query.keys():
            relevant_events = get_event_ids_in_radius(Event, query['latitude'], query['longitude'], float(query['radius']))
            events = Event.select(lambda x: x.id in relevant_events)[:]
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
    app.add_routes([web.get('/api/events', get_handler)])
    app.add_routes([web.post('/api/events', post_handler)])

    web.run_app(app)
    print("======= Running ======")

if __name__ == "__main__":
    db.generate_mapping(create_tables=True)
    main()