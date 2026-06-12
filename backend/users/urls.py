from django.urls import path

from .views import (
    RegisterView,
    ClientListView,
    CustomTokenObtainPairView
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [

    path(
        'register/',
        RegisterView.as_view(),
        name='register'
    ),

    path(
        'login/',
        CustomTokenObtainPairView.as_view(),
        name='login'
    ),

    path(
        'refresh/',
        TokenRefreshView.as_view(),
        name='refresh'
    ),

    path(
        'clients/',
        ClientListView.as_view(),
        name='clients'
    ),
]