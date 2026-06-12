from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

from .serializers import (
    CustomTokenObtainPairSerializer
)

from rest_framework.generics import ListAPIView
from .models import Utilisateur
from .serializers import UtilisateurSerializer

class ClientListView(ListAPIView):

    serializer_class = UtilisateurSerializer

    queryset = Utilisateur.objects.filter(role='client')

class CustomTokenObtainPairView(
    TokenObtainPairView
):

    serializer_class = (
        CustomTokenObtainPairSerializer
    )
       
class RegisterView(APIView):

    permission_classes = []

    authentication_classes = []

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "Compte créé avec succès"
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )