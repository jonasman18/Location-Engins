from rest_framework import viewsets

from .models import DetailLocation

from .serializers import (
    DetailLocationSerializer
)


class DetailLocationViewSet(
    viewsets.ModelViewSet
):

    queryset = DetailLocation.objects.all()

    serializer_class = DetailLocationSerializer