import tornado.ioloop
import tornado.web
from utils import test_controller
from lxml import etree


class MainHandler(tornado.web.RequestHandler):
    def post(self):
        body = eval(self.request.body)
        xml_str = body['xml'].encode()
        user_id = body['cashRegister_id']

        xml = etree.fromstring(xml_str)

        # response to client and test request
        self.write(test_controller.test_request(user_id, xml))


def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
