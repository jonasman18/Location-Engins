from rest_framework import viewsets

from .models import (
    Categorie,
    Engin
)

from .serializers import (
    CategorieSerializer,
    EnginSerializer
)


class CategorieViewSet(viewsets.ModelViewSet):

    queryset = Categorie.objects.all()

    serializer_class = CategorieSerializer


class EnginViewSet(viewsets.ModelViewSet):

    queryset = Engin.objects.all()

    serializer_class = EnginSerializer