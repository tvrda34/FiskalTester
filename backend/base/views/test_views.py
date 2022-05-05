from email import message
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from base.models import Test, TestResult, TestMethod, Register
from base.serializers import TestMethodSerializer, TestResultSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTestResult(request, pk):
    try:
        user = request.user
        testResult = TestResult.objects.get(user=user, id=pk)
    except:
        message = {'detail': 'No tests for this user & id pari!'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

    serializer = TestResultSerializer(testResult, many=False)
    return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTestResultsForCashRegister(request, pk):
    try:
        user = request.user
        register = Register.objects.get(user=user, id=pk)
    except:
        message = {'detail': 'No tests for this user and register!'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

    testResult = TestResult.objects.filter(register=register)
    serializer = TestResultSerializer(testResult, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTestMethods(request, pk):
    try:
        user = request.user
        testResult = TestResult.objects.get(user=user, id=pk)
    except:
        message = {'detail': 'No details for this user & test pair!'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

    testMethod = TestMethod.objects.filter(testResult=testResult)
    serializer = TestMethodSerializer(testMethod, many=True)
    return Response(serializer.data)
    


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTest(request, pk):
    try:
        user = request.user
        test = TestResult.objects.get(id=pk, user=user)
        test.delete()
        return Response('Test deleted!')
    except TestResult.DoesNotExist:
        message = {'detail': 'Test with this id does not exsists!'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)