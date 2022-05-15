from tornado.httpclient import AsyncHTTPClient, HTTPRequest
import asyncio
from configparser import ConfigParser
from signxml import XMLSigner, methods
from lxml import etree

async def post(uuid, xml, cert, key):
    http_client = AsyncHTTPClient()
    try:
        #sign xml same as in fina example request
        signed = XMLSigner(method = methods.enveloped,
            signature_algorithm = 'rsa-sha1',
            digest_algorithm = 'sha1',
            c14n_algorithm = 'http://www.w3.org/2001/10/xml-exc-c14n#').sign(etree.fromstring(xml.encode('utf-8')), key=key, cert=cert)
        strfile = etree.tostring(signed, pretty_print="true").decode(encoding="utf-8")
        
        body = {'uuid': uuid, 'xml': strfile}

        response = await http_client.fetch(HTTPRequest('http://localhost:8888/', method="POST", body=repr(body)))
    except Exception as e:
        print(e)
    else:
        print(response.body.decode(encoding="utf-8"))


if __name__ == '__main__':
    uuid = '54af72a25cf24ad6b93ab0eaea5a4fc0'  # cashReg
    configur = ConfigParser()
    configur.read('config.ini')
    xml = open(configur.get('file', 'input')).read()
    cert = open(configur.get('file', 'cert')).read()
    key = open(configur.get('file', 'key')).read()
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(post(uuid, xml, cert, key))
