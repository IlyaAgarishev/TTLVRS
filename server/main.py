import aiohttp
import asyncio
from aiohttp import web
from db import db
from classes import *
import json

async def handler(request):
    request_json = 'Ne nu eto BAN'
    try:
        request_json = await request.json()
    except json.decoder.JSONDecodeError:
        print(request_json)
        return web.Response(text=request_json)
    print(request_json)
    return web.Response(text="Ok")

async def main():
    server = web.Server(handler)
    runner = web.ServerRunner(server)
    await runner.setup()
    site = web.TCPSite(runner, '0.0.0.0', 8080)
    await site.start()

    print("======= Serving on http://0.0.0.0:8080/ ======")

    # pause here for very long time by serving HTTP requests and
    # waiting for keyboard interruption
    await asyncio.sleep(100*3600)


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    try:
        loop.run_until_complete(main())
    except KeyboardInterrupt:
        pass
    loop.close()

