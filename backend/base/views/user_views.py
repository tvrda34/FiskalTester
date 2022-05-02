from operator import imod
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.conf import settings

from django.template.loader import render_to_string
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from six import text_type
from django.utils.encoding import force_str, force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

#User views

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
            is_active=False
        )

        subject = 'Account Verification'
        message = 'Welcome'
        verify_link = 'http://localhost:3000/email-verify/' + urlsafe_base64_encode(force_bytes(user.pk))
        html_content = render_to_string('verify_email.html', {'verify_link':verify_link, 'base_url': 'http://localhost:3000/email-verify/' }) 

        send_mail(
            subject = subject,
            message = message,
            html_message = html_content,
            from_email = settings.EMAIL_HOST_USER,
            recipient_list = [user.email], 
            fail_silently = False,
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def validateEmailToken(request):
    token = request.data['tverify']

    try:
        uid = force_str(urlsafe_base64_decode(token))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and not user.is_active:
        user.is_active = True
        user.save()
        res = {
            'status': 'success',
            'message': 'Valid',
        }
    else:
        res = {
            'status': 'failed',
            'message': 'Invalid',
        }
    
    return Response(res)

