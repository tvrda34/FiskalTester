from django.urls import path
from base.views import register_views as views

urlpatterns = [

    path('create/', views.createRegister, name="create-register"),

    path('', views.getCashRegisters, name="registers"),
    path('<str:pk>/', views.getCashRegister, name="register"),

    path('delete/<str:pk>/', views.deleteCashRegister, name="delete-cash-register"),
    path('update/<str:pk>/', views.updateCashRegister, name="update-cash-register"),
]