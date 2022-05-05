from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields ='__all__'

class TestRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields ='__all__'
class TestMethodSerializer(serializers.ModelSerializer):
    testRun = TestRunSerializer(many=False, read_only=True)
    class Meta:
        model = TestMethod
        fields ='__all__'

class TestResultSerializer(serializers.ModelSerializer):
    register = RegisterSerializer(many=False, read_only=True)
    class Meta:
        model = TestResult
        fields ='__all__'