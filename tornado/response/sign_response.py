from lxml import etree
from signxml import XMLSigner
from pathlib import Path

def sign(xml):

    base_path = Path(__file__).parent
    certPath = (base_path / "../dummy_data/newcert.pem").resolve()
    keyPath = (base_path / "../dummy_data/newkey.pem").resolve()

    cert = certPath.open().read()
    key = keyPath.open().read()
    signed_root = XMLSigner().sign(xml, key=key, cert=cert)

    return signed_root
