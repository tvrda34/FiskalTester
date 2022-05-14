from tornado.httpclient import AsyncHTTPClient, HTTPRequest
import asyncio
from configparser import ConfigParser

async def post(cashRegister_id, xml):
    http_client = AsyncHTTPClient()
    try:
        file = ""
        for line in xml:
            file += line
        body = {'cashRegister_id': cashRegister_id, 'xml': file}

        response = await http_client.fetch(HTTPRequest('http://localhost:8888/', method="POST", body=repr(body)))
    except Exception as e:
        print("Error: %s" % e)
    else:
        print(response.body.decode(encoding="utf-8"))


if __name__ == '__main__':
    cashRegister_id = '10'  # cashReg
    configur = ConfigParser()
    configur.read('config.ini')
    xml = open(configur.get('file', 'input'), 'r')
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(post(cashRegister_id, xml))
