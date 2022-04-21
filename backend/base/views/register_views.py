from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from base.models import Register
from base.serializers import RegisterSerializer

#Cash register views

@api_view(['GET'])
def getCashRegisters(request):
    registers = Register.objects.all()
    serializer = RegisterSerializer(registers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCashRegister(request, pk):
    register = Register.objects.get(id=pk)
    serializer = RegisterSerializer(register, many=False)
    return Response(serializer.data)