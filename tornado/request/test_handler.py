import random
from textwrap import fill
from response import response_generator
from .TestCase import TestCase
from response import sign_response
from utils.test_helper import TestUtil

# xml - lxml.etree variable
# JIR, IdPoruke -> string
# toVerify toModify toSign -> boolean
def run_test_case(xml, JIR, IdPoruke):

    testCase = TestCase(xml)
    #testCase.listPlugins()
    errorSet = set()
    
    # add all errors found by all verify plugins
    for element in testCase.verify():
        errorSet.add(element)
    
    #method for automatic random responses
    fillRandom = False

    #test util method. Save test validation result
    testUtil = TestUtil(errorSet)
    testUtil.validation()

    if(len(errorSet) == 0):
        if(random.randint(0,2) != 0):
            fillRandom = True
    else:
        if(random.randint(0,1) == 0):
            errorSet.clear()
            fillRandom = True
    
    if(fillRandom):
        while True:
            error = "s00" + str(random.randint(1,6))
            errorSet.add(error)
            if random.randint(0,1) == 0:
                break
    
    sorted(errorSet)
    testCase.dom = response_generator.generateOutputFile(errorSet, JIR, IdPoruke)
    
    signed = random.randint(0,1)
    if(signed == 0):
        testCase.dom = sign_response.sign(testCase.dom)
    
    # describe the test that occured
    testUtil.note_test(fillRandom, signed)

    # attrs = vars(testUtil)
    # print(', '.join("%s: %s" % item for item in attrs.items()))
    return testCase.dom, testUtil
