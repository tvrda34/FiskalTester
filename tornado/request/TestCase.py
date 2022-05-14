from .verify_request import CheckImplementation

class TestCase:

    def __init__(self, dom):
        # parse the given file
        self.dom = dom

    def verify(self):
        verifyResult = set()
        
        implChecker = CheckImplementation()
        
        # for each element in set
        for element in implChecker.verify(xml=self.dom):
            verifyResult.add(element)
        return verifyResult
