from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Reservation
from .serializers import ReservationSerializer


class ReservationViewSet(viewsets.ModelViewSet):

    queryset = Reservation.objects.all()

    serializer_class = ReservationSerializer


    # =========================================
    # CONFIRMER
    # =========================================

    @action(detail=True, methods=['patch'])

    def confirmer(self, request, pk=None):

        reservation = self.get_object()

        reservation.statut = 'confirmee'

        reservation.save()


        # =====================================
        # ENGIN RESERVE
        # =====================================

        reservation.engin.etat = 'reserve'

        reservation.engin.save()

        return Response({
            "message": "Réservation confirmée"
        })


    # =========================================
    # ANNULER
    # =========================================

    @action(detail=True, methods=['patch'])

    def annuler(self, request, pk=None):

        reservation = self.get_object()

        reservation.statut = 'annulee'

        reservation.save()


        # =====================================
        # ENGIN DISPONIBLE
        # =====================================

        reservation.engin.etat = 'disponible'

        reservation.engin.save()

        return Response({
            "message": "Réservation annulée"
        })


    # =========================================
    # TERMINER
    # =========================================

    @action(detail=True, methods=['patch'])

    def terminer(self, request, pk=None):

        reservation = self.get_object()

        reservation.statut = 'terminee'

        reservation.save()


        # =====================================
        # ENGIN DISPONIBLE
        # =====================================

        reservation.engin.etat = 'disponible'

        reservation.engin.save()

        return Response({
            "message": "Réservation terminée"
        })