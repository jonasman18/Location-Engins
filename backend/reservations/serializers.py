from rest_framework import serializers

from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):

    client_nom = serializers.CharField(
        source='client.nom',
        read_only=True
    )

    engin_nom = serializers.CharField(
        source='engin.nom',
        read_only=True
    )

    class Meta:

        model = Reservation

        fields = [

            'id',

            'client',
            'client_nom',

            'engin',
            'engin_nom',

            'date_debut',
            'date_fin',

            'montant_total',

            'statut',

            'date_creation',
        ]

        read_only_fields = (

            'montant_total',

            'date_creation',

            'client_nom',

            'engin_nom',
        )

    def validate(self, data):

        date_debut = data.get('date_debut')

        date_fin = data.get('date_fin')

        engin = data.get('engin')

        # =====================================
        # Vérification dates
        # =====================================

        if date_fin < date_debut:

            raise serializers.ValidationError(
                "La date de fin doit être après la date début"
            )

        # =====================================
        # Vérification disponibilité
        # =====================================

        reservations = Reservation.objects.filter(

            engin=engin,

            date_debut__lte=date_fin,

            date_fin__gte=date_debut,

        )

        # Exclure réservation actuelle en modification

        if self.instance:

            reservations = reservations.exclude(
                id=self.instance.id
            )

        if reservations.exists():

            raise serializers.ValidationError(
                "Cet engin est déjà réservé pour cette période"
            )

        return data