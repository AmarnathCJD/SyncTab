import aiohttp
from aiohttp import web
import asyncio
from aiohttp_sse import sse_response
import aiohttp_cors
import json

COUNT = 0


async def ws_count(request: web.Request):
    global COUNT
    try:
        async with sse_response(request) as resp:
            prev_count = COUNT

            while resp.is_connected():

                if prev_count != COUNT:
                    await resp.send(json.dumps({'count': COUNT}))
                    prev_count = COUNT
                await asyncio.sleep(0.01)
        return resp
    except ConnectionResetError:
        return resp


async def increment_count(_):
    global COUNT
    COUNT += 1
    return web.Response(text=str(COUNT), status=201)


async def reset_count(_):
    global COUNT
    COUNT = 0
    return web.Response(text=str(COUNT), status=201)

async def fetch_count(_):
    global COUNT
    return web.json_response({'count': COUNT})

async def index(request: web.Request):
    async with aiohttp.ClientSession() as session:
        print(request.path)  # Log the request path for debugging
        try:
            async with session.request(
                request.method,
                f'http://localhost:3000{request.path}',
                headers=request.headers,
                data=await request.read()
            ) as response:
                body = await response.read()
                print(response.status)  # Log the response status for debugging
                
                return web.Response(text=body.decode(), status=response.status, headers=response.headers)
            
        except aiohttp.ClientError as e:
            print(f"Error during request forwarding: {e}")
            # Handle the error appropriately, e.g., return an error response
            return web.Response(status=500, text="Internal Server Error")

app = web.Application()
app.router.add_get('/api/ws', ws_count)
app.router.add_post('/api/increment', increment_count)
app.router.add_post('/api/reset', reset_count)
app.router.add_get('/api/fetch', fetch_count)
app.router.add_get('/', index)

# wildcard static
app.router.add_get("/static/{path:.*}", index)

cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
        allow_credentials=True,
        expose_headers="*",
        allow_headers="*"
    )
})

for route in list(app.router.routes()):
    cors.add(route)


if __name__ == '__main__':
    web.run_app(app, port=5000)
