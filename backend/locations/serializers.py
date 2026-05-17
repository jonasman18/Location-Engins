from rest_framework import serializers

from .models import Location

from paiements.models import Paiement

from detail_locations.models import DetailLocation


# =========================================
# DETAIL LOCATION SERIALIZER
# =========================================

class DetailLocationSerializer(
    serializers.ModelSerializer
):

    engin_nom = serializers.CharField(
        source='engin.nom',
        read_only=True
    )

    class Meta:

        model = DetailLocation

        fields = [
            'id',
            'engin_nom',
            'prix_total'
        ]


# =========================================
# LOCATION SERIALIZER
# =========================================

class LocationSerializer(
    serializers.ModelSerializer
):

    utilisateur_nom = serializers.CharField(
        source='utilisateur.nom',
        read_only=True
    )

    montant_paye = serializers.SerializerMethodField()

    reste_a_payer = serializers.SerializerMethodField()

    # IMPORTANT
    details = DetailLocationSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Location

        fields = [
            'id',
            'utilisateur',
            'utilisateur_nom',
            'date_location',
            'date_debut',
            'date_fin',
            'statut',
            'caution_versee',
            'montant_total',
            'montant_paye',
            'reste_a_payer',
            'details',
        ]


    # =========================================
    # TOTAL PAYE
    # =========================================

    def get_montant_paye(
        self,
        obj
    ):

        paiements = Paiement.objects.filter(
            location=obj
        )

        total = sum(
            paiement.montant
            for paiement in paiements
        )

        return total


    # =========================================
    # RESTE A PAYER
    # =========================================

    def get_reste_a_payer(
        self,
        obj
    ):

        paiements = Paiement.objects.filter(
            location=obj
        )

        total_paye = sum(
            paiement.montant
            for paiement in paiements
        )

        return (
            obj.montant_total -
            total_paye
        )