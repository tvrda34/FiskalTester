from django.urls import path
from base.views import test_views as views

urlpatterns = [
    path('testResult/<str:pk>/', views.getTestResult, name='test-result'),
    path('<str:pk>/', views.getTestResultsForCashRegister, name='test-results'),
    path('result/<str:pk>/', views.getTestMethods, name="test-methods"),
    path('delete/<str:pk>/', views.deleteTest, name="delete-test"),
    path('', views.getTestResultsForUser, name="user-tests"),
]