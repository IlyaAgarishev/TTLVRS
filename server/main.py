import aiohttp
import asyncio
from aiohttp import web
from db import db
from classes import *
import json

async def get_handler(request):
    with db_session:
        events_json = list(map(lambda x: x.event_to_dict(), Event.select()[:]))
        response = web.Response(text=json.dumps(events_json, default=json_serial))
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