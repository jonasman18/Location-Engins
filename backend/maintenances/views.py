from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from django.utils import timezone

from .models import Maintenance

from .serializers import (
    MaintenanceSerializer
)


class MaintenanceViewSet(
    viewsets.ModelViewSet
):

    queryset = Maintenance.objects.all()\
        .order_by('-created_at')

    serializer_class = (
        MaintenanceSerializer
    )

    # =====================================
    # CREATION MAINTENANCE
    # =====================================

    def perform_create(
        self,
        serializer
    ):

        maintenance = serializer.save()

        engin = maintenance.engin

        engin.etat = (
            "en_maintenance"
        )

        engin.save()

    # =====================================
    # TERMINER MAINTENANCE
    # =====================================

    @action(
        detail=True,
        methods=["patch"]
    )
    def terminer(
        self,
        request,
        pk=None
    ):

        maintenance = self.get_object()

        # =========================
        # MAINTENANCE TERMINEE
        # =========================

        maintenance.statut = (
            "terminee"
        )

        maintenance.date_fin = (
            timezone.now().date()
        )

        maintenance.save()

        # =========================
        # ENGIN DISPONIBLE
        # =========================

        engin =   maintenance.engin

        engin.etat = (
            "disponible"
        )

        engin.save()

        return Response(
            {
                "message":
                "Maintenance terminée"
            },
            status=status.HTTP_200_OK
        )