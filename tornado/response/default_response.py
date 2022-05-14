
# structure used to store the key value pair of an xml element
class Label:

    def __init__(self, key, value):
        self.key = key
        self.value = value

    def __str__(self):
        return self.key + ", " + self.value


# structure used to contain multiple labels and the text of the element
class Element:

    label = None

    def __init__(self, title):
        self.title = title

    def __str__(self):
        return self.title


elements = []
data = Element("Envelope")
body = Element("body")
racunOdgovor = Element("RacunOdgovor")
zaglavlje = Element("Zaglavlje")
idPoruke = Element("IDporuke")
datumVrijeme = Element("datumVrijeme")
jir = Element("JIR")
signature = Element("Signature")
signedInfo = Element("SignedInfo")
canonicalizationMethod = Element("CanonicalizationMethod")
signatureMethod = Element("SignatureMethod")
reference = Element("Reference")
transforms = Element("Transforms")
digestMethod = Element("DigestMethod")
digestValue = Element("DigestValue")
signatureValue = Element("SignatureValue")
keyInfo = Element("KeyInfo")
x509Certificate = Element("X509Certificate")
x509Data = Element("X509Data")
x509IssueSerial = Element("X509IssueSerial")
x509IssuerName = Element("X509IssuerName")
x509SerialNumber = Element("X509SerialNumber")

data.label = Label("Envelope", [("soap", "http://schemas.xmlsoap.org/soap/envelope/"), ("xsd", "http://www.w3.org/2001/XMLSchema"), ("xsi", "http://www.w3.org/2001/XMLSchema-instance")])
elements.append(data)

body.label = Label("body", "")
elements.append(body)

racunOdgovor.label = Label("RacunOdgovor", [("Id", "G0xcabf5080-4D"), ("shemaLocation", "http://www.apis-it.hr/fin/2012/types/f73 ../schema/FiskalizacijaSchema.xsd"), ("tns", "http://www.apis-it.hr/fin/2012/types/f73")])
elements.append(racunOdgovor)

zaglavlje.label = Label("Zaglavlje", "")
elements.append(zaglavlje)

idPoruke.label = Label("IdPoruke", "733362f1-063f-11e2-892e-0800200c9a66")
elements.append(idPoruke)

datumVrijeme.label = Label("DatumVrijeme", "01.09.2012T21:10:38")
elements.append(datumVrijeme)

jir.label = Label("Jir", "6b7749c6-56c1-4cf5-b7f7-9f29cebc9f7f")
elements.append(jir)

signature.label = Label("Signature", ('xmlns', 'http://www.w3.org/2000/09/xmldsig#'))
elements.append(signature)

signedInfo.label = Label("SignedInfo", "")
elements.append(signedInfo)

canonicalizationMethod.label = Label("CanonicalizationMethod", ("Algorithm", "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"))
elements.append(canonicalizationMethod)

signatureMethod.label = Label("SignatureMethod", ("Algorithm", "http://www.w3.org/2000/09/xmldsig#rsa-sha1"))
elements.append(signatureMethod)

reference.label = Label("Reference", ("URI", "#G0xcabf5080-4D"))
elements.append(reference)

transforms.label = Label("Transforms", [])
transforms.label.value.append(Label("Transform", ("Algorithm", "http://www.w3.org/2000/09/xmldsig#envelopedsignature")))
transforms.label.value.append(Label("Transform", ("Algorithm", "http://www.w3.org/TR/2001/REC-xml-c14n-20010315")))
elements.append(transforms)
