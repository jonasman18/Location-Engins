from rest_framework import viewsets

from .models import Paiement

from .serializers import PaiementSerializer


class PaiementViewSet(
    viewsets.ModelViewSet
):

    queryset = Paiement.objects.all().order_by(
        '-date_paiement'
    )

    serializer_class = PaiementSerializer