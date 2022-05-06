from django.core.files import File
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from django.conf import settings
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def downloadCert(self):
    path_to_file = settings.MEDIA_ROOT + '/newcert.pem'
    f = open(path_to_file, 'rb')
    certFile = File(f)
    response = HttpResponse(certFile.read())
    response['Content-Disposition'] = 'attachment'
    response['Content-Type'] = '.pem'
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def downloadKey(self):
    path_to_file = settings.MEDIA_ROOT + '/newkey.pem'
    f = open(path_to_file, 'rb')
    keyFile = File(f)
    response = HttpResponse(keyFile.read())
    response['Content-Disposition'] = 'key'
    response['Content-Type'] = '.pem'
    return response