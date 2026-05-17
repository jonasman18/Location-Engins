from rest_framework import serializers

from .models import (
    Categorie,
    Engin
)

from reservations.models import Reservation

from django.utils.timezone import now


# =========================================
# CATEGORIE SERIALIZER
# =========================================

class CategorieSerializer(serializers.ModelSerializer):

    class Meta:

        model = Categorie

        fields = '__all__'


# =========================================
# ENGIN SERIALIZER
# =========================================

class EnginSerializer(serializers.ModelSerializer):

    categorie_nom = serializers.CharField(
        source='categorie.nom',
        read_only=True
    )

    reservations = serializers.SerializerMethodField()

    statut_location = serializers.SerializerMethodField()


    class Meta:

        model = Engin

        fields = '__all__'


    # =========================================
    # LISTE DES RESERVATIONS
    # =========================================

    def get_reservations(self, obj):

        reservations = Reservation.objects.filter(
            engin=obj,
            statut='confirmee'
        ).order_by('-date_debut')

        data = []

        for reservation in reservations:

            data.append({

                "client": reservation.client.nom,

                "date_debut": reservation.date_debut,

                "date_fin": reservation.date_fin,

                "statut": reservation.statut,
            })

        return data


    # =========================================
    # STATUT LOCATION ACTUEL
    # =========================================

    def get_statut_location(self, obj):

        today = now().date()

        reservation_exist = Reservation.objects.filter(
            engin=obj,
            statut='confirmee',
            date_debut__lte=today,
            date_fin__gte=today
        ).exists()


        if obj.etat == 'maintenance':

            return 'maintenance'


        if reservation_exist:

            return 'reserve'


        return 'disponible'