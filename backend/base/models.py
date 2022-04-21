from atexit import register
from sqlite3 import Timestamp
from statistics import mode
from urllib import request
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Register(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=100, null=False, blank=False)
    version = models.DecimalField(max_digits=5, decimal_places=2)
    location = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(max_length=400, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    numTest = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self) :
        return self.name

class Test(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(max_length=400, null=True, blank=True)

    def __str__(self) :
        return self.name

class TestResult(models.Model):
    register = models.ForeignKey(Register, on_delete=models.CASCADE, null=False)
    bill_num = models.TextField(max_length=400, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    result = models.BooleanField(default=False)
    result_description = models.TextField(max_length=400, null=True, blank=True)

    def __str__(self) :
        return '%s %s' % (self.register.name, str(self.id))

class TestMethod(models.Model):
    testResult = models.ForeignKey(TestResult, on_delete=models.CASCADE, null=False)
    request = models.TextField(null=True)
    response = models.TextField(null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    testRun = models.ForeignKey(Test, on_delete=models.DO_NOTHING, null=True)
    description = models.TextField(max_length=400, null=True, blank=True)

