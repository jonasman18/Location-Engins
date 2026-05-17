from rest_framework import serializers

from .models import Maintenance


class MaintenanceSerializer(
    serializers.ModelSerializer
):

    engin_nom = serializers.CharField(
        source="engin.nom",
        read_only=True
    )

    class Meta:

        model = Maintenance

        fields = "__all__"

    # =====================================
    # CREATE
    # =====================================

    def create(
        self,
        validated_data
    ):

        maintenance =   Maintenance.objects.create(
                **validated_data
            )

        # =========================
        # ENGIN EN MAINTENANCE
        # =========================

        engin = maintenance.engin

        engin.statut_location = "en_maintenance"

        engin.save()

        return maintenance