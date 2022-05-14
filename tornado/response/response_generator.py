from lxml import etree as ElementTree
from lxml.etree import QName
from datetime import datetime as dt
import sys
from . import default_response

sys.path.append("..")
from utils import  error_dictionary, utility_functions


class XMLNamespaces:
    soap = "http://schemas.xmlsoap.org/soap/envelope/"
    xsd = "http://www.w3.org/2001/XMLSchema"
    xsi = "http://www.w3.org/2001/XMLSchema-instance"
    tns = "http://www.apis-it.hr/fin/2012/types/f73"


def generateOutputFile(greskeSet, JIR, IdPoruke):
    labels = []
    for element in default_response.elements:
        labels.append(element.label)

    labelData = labels[0]
    labelBody = labels[1]
    labelRacunOdgovor = labels[2]
    labelZaglavlja = labels[3]

    namespaces = {
        "soap": "http://schemas.xmlsoap.org/soap/envelope/",
        "xsd": "http://www.w3.org/2001/XMLSchema",
        "xsi": "http://www.w3.org/2001/XMLSchema-instance",
    }
    tnsNameSpace = {"tns": "http://www.apis-it.hr/fin/2012/types/f73"}
    

    data = ElementTree.Element(QName(XMLNamespaces.soap, labelData.key), nsmap=namespaces)
    data.set(labelData.value[0][0], labelData.value[0][1])
    data.set(labelData.value[1][0], labelData.value[1][1])
    data.set(labelData.value[2][0], labelData.value[2][1])

    body = ElementTree.SubElement(data, QName(XMLNamespaces.soap, labelBody.key))

    racunOdgovor = ElementTree.SubElement(body, QName(XMLNamespaces.tns, labelRacunOdgovor.key), nsmap=tnsNameSpace)
    racunOdgovor.set(labelRacunOdgovor.value[0][0], labelRacunOdgovor.value[0][1])
    racunOdgovor.set(labelRacunOdgovor.value[1][0], labelRacunOdgovor.value[1][1])
    racunOdgovor.set(labelRacunOdgovor.value[2][0], labelRacunOdgovor.value[2][1])

    zaglavlje = ElementTree.SubElement(racunOdgovor,QName(XMLNamespaces.tns, labelZaglavlja.key))
    zaglavlje.text = labelZaglavlja.value

    IdPoruke = ElementTree.SubElement(zaglavlje, QName(XMLNamespaces.tns,"IdPoruke"))
    IdPoruke.text = "Test"

    DatumVrijeme = ElementTree.SubElement(zaglavlje, QName(XMLNamespaces.tns, "DatumVrijeme"))
    DatumVrijeme.text = dt.now().strftime("%d/%m/%Y %H:%M:%S")

    # we assume no mistake occured
    if not greskeSet:
        Jir = ElementTree.SubElement(racunOdgovor,QName(XMLNamespaces.tns,"JIR"))
        Jir.text = JIR
    else:
        Greske = ElementTree.SubElement(racunOdgovor, QName(XMLNamespaces.tns, "Greske"))
        for g in greskeSet:
            greska = ElementTree.SubElement(Greske,QName(XMLNamespaces.tns, "Greska"))
            greska.set(g, error_dictionary.errorDictionary[g])
    return data

    # remove after test
if __name__ == '__main__':
    JIR = "000000000"
    greskeSet = set()
    IdPoruke = "11111111111"

    utility_functions.printXML(generateOutputFile(greskeSet, JIR, IdPoruke))
