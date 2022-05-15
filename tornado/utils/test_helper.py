
from utils import  error_dictionary

class TestUtil(object):

    def __init__(self, errors):
        # parse the given file
        self.errors = errors
        self.testNote = ""
        self.validationMsg = ""
        self.type = 1
        self.signed = None
        self.fillRandom = None


    def validation(self):
        if(len(self.errors) == 0):
            self.testNote = "Correct request."
            self.validationMsg = "Request OK"
        else:
            self.testNote = "Wrong request."
            self.validationMsg = self.validationMsg + "\nValid errors:"
            for err in self.errors:
                self.validationMsg = self.validationMsg + "\n"  + err + ": " + error_dictionary.errorDictionary[err]
    
    def note_test(self, fillRandom, signed):
        self.signed = signed
        self.fillRandom = fillRandom

        if(fillRandom == False and signed == 0):
            self.testNote = self.testNote + " Correct response."
            self.type = 1
        else:
            self.testNote = self.testNote + " Response wrong for this request."
            self.type = 2

        if(signed == 1):
            self.testNote = self.testNote + " Response not signed."
        
        if(fillRandom):
            self.testNote = self.testNote + " Wrong errors in response."
        elif(len(self.errors) != 0 and fillRandom == False):
            self.testNote = self.testNote + " Valid errors in response."
        
        if(len(self.errors) != 0):
            self.testNote = self.testNote + " Waiting for cash registers next action..."

        
    
