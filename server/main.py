import aiohttp
import asyncio
from aiohttp import web
from db import db
from classes import *

async def index(request):
    return web.Response(text='Hello Aiohttp!')

def setup_routes(app):
    app.router.add_get('/', index)

if __name__ == "__main__":
    app = web.Application()
    setup_routes(app)
    web.run_app(app, host='0.0.0.0', port=8080)
