from lxml import etree as ElementTree

def printXML(dom):
    print(ElementTree.tostring(dom, pretty_print="true"))
