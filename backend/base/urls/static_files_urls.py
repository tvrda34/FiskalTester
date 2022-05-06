from django.urls import path
from base.views import static_views as views

urlpatterns = [
    path('cert/', views.downloadCert, name='download-cert'),
    path('key/', views.downloadKey, name='download-key'),
]