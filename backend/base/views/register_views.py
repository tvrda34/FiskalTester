from email import message
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from base.models import Register
from base.serializers import RegisterSerializer

#Cash register views

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRegister(request):
    user = request.user

    register = Register.objects.create(
        user=user,
        name='Sample name',
        location='Sample location',
        description='Sample description',
        version=0.0
    )

    serializer = RegisterSerializer(register, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCashRegisters(request):
    user = request.user
    registers = Register.objects.filter(user=user)
    serializer = RegisterSerializer(registers, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCashRegister(request, pk):
    try:
        user = request.user
        data = request.data
        register = Register.objects.get(id=pk, user=user)

        register.name = data['name']
        register.description = data['description']
        register.version = data['version']
        register.location = data['location']

        register.save()

        serializer = RegisterSerializer(register, many=False)
        return Response(serializer.data)
    except Register.DoesNotExist:
        message = {'detail': 'Cash register with this id does not exsists!'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCashRegister(request, pk):
    try:
        user = request.user
        product = Register.objects.get(id=pk, user=user)
        product.delete()
        return Response('Cash register deleted!')
    except Register.DoesNotExist:
        message = {'detail': 'Cash register with this id does not exsists!'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCashRegister(request, pk):
    try:
        user = request.user
        register = Register.objects.get(id=pk, user=user)
        serializer = RegisterSerializer(register, many=False)
        return Response(serializer.data)
    except Register.DoesNotExist:
        message = {'detail': 'Cash register with this id does not exsists!'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)