from email import message
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from base.models import Test, TestResult, TestMethod, Register
from base.serializers import TestMethodSerializer, TestResultSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTestResult(request, pk):
    user = request.user
    testResult = TestResult.objects.get(user=user, id=pk)
    serializer = TestResultSerializer(testResult, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTestResultsForCashRegister(request, pk):
    user = request.user
    register = Register.objects.get(user=user, id=pk)
    testResult = TestResult.objects.filter(register=register)
    serializer = TestResultSerializer(testResult, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTestMethods(request, pk):
    user = request.user
    testResult = TestResult.objects.get(user=user, id=pk)
    testMethod = TestMethod.objects.filter(testResult=testResult)
    serializer = TestMethodSerializer(testMethod, many=True)
    return Response(serializer.data)