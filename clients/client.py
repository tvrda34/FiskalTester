from tornado.httpclient import AsyncHTTPClient, HTTPRequest
import asyncio
from configparser import ConfigParser

async def post(uuid, xml):
    http_client = AsyncHTTPClient()
    try:
        body = {'uuid': uuid, 'xml': xml}

        response = await http_client.fetch(HTTPRequest('http://localhost:8888/', method="POST", body=repr(body)))
    except Exception as e:
        print(e.with_traceback())
    else:
        print(response.body.decode(encoding="utf-8"))


if __name__ == '__main__':
    uuid = '54af72a25cf24ad6b93ab0eaea5a4fc0'  # test uuid
    configur = ConfigParser()
    configur.read('config.ini')
    xml = open(configur.get('file', 'input')).read()
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(post(uuid, xml))
