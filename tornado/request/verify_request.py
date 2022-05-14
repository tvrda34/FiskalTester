
from signxml import XMLVerifier, InvalidCertificate
from lxml import etree
from cryptography import x509
from cryptography.hazmat.backends import default_backend
from datetime import datetime


class CheckImplementation:

    # Verify a file properly
    def verify(self, xml: etree):
        errorSet = set()
        
        cert = CheckImplementation.loadCert(xml)
        
        #check issuer
        if("C=HR,O=FINA" not in str(cert.issuer)):
            errorSet.add("s002")
        
        #check name
        if("FISKAL" not in str(cert.subject)):
            errorSet.add("s003")

        #check date until which is valid
        if(datetime.now() > cert.not_valid_after):
            errorSet.add("s002")

        #Check signature
        try:
            verified_data = XMLVerifier().verify(xml, "newkey.pem")
            print(verified_data)
        except InvalidCertificate as e:
            print(e)
        
        errorSet.add("s004")  # Signature not valid
        
        #Check OIB
        
        return errorSet
    
    def loadCert(xml: etree):
        pem_data = xml.xpath('//*[local-name()="X509Certificate"]/text()')[0]
        pem_data = '-----BEGIN CERTIFICATE-----\n' + pem_data +'\n-----END CERTIFICATE-----\n'
        
        return x509.load_pem_x509_certificate(str.encode(pem_data), default_backend())
