from django.urls import path
from base.views import register_views as views

urlpatterns = [
    path('', views.getCashRegisters, name="registers"),
    path('<str:pk>', views.getCashRegister, name="register"),
]