from django.urls import path
from base.views import test_views as views

urlpatterns = [
    path('testResult/<str:pk>/', views.getTestResult, name='test-result'),
    path('testResults/<str:pk>/', views.getTestResultsForCashRegister, name='test-results'),
    path('testMethods/<str:pk>/', views.getTestMethods, name="test-methods"),
]