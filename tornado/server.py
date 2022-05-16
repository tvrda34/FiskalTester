import tornado.ioloop
import tornado.web
from utils import test_controller
from lxml import etree


class MainHandler(tornado.web.RequestHandler):
    
    def check_origin(self, origin):
        return True

    def post(self):
        body = eval(self.request.body)
        xml_str = body['xml'].encode()
        uuid = body['uuid']

        xml = etree.fromstring(xml_str)

        #check access
        access = test_controller.check_access(uuid)
        if access == None:
            self.clear()
            self.set_status(403)
        else:
            (register_id, user_id) = access
            # response to client and test request
            self.write(test_controller.test_request(xml, register_id, user_id))


def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
