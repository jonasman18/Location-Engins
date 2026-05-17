from rest_framework import serializers

from .models import DetailLocation


class DetailLocationSerializer(
    serializers.ModelSerializer
):

    engin_nom = serializers.CharField(
        source='engin.nom',
        read_only=True
    )

    class Meta:

        model = DetailLocation

        fields = '__all__'


    # =====================================
    # VALIDATION DISPONIBILITE
    # =====================================

    def validate(self, data):

        engin = data['engin']

        location = data['location']

        date_debut = location.date_debut

        date_fin = location.date_fin

        # =====================================
        # RECHERCHE CONFLIT
        # =====================================

        conflit = DetailLocation.objects.filter(

            engin=engin,

            location__date_debut__lte=date_fin,

            location__date_fin__gte=date_debut

        ).first()

        # =====================================
        # EXCLURE MODIFICATION
        # =====================================

        if self.instance:

            conflit = DetailLocation.objects.filter(

                engin=engin,

                location__date_debut__lte=date_fin,

                location__date_fin__gte=date_debut

            ).exclude(
                id=self.instance.id
            ).first()

        # =====================================
        # SI CONFLIT
        # =====================================

        if conflit:

            ancienne_location = conflit.location

            raise serializers.ValidationError(

                f"L'engin '{engin.nom}' est déjà réservé du "
                f"{ancienne_location.date_debut} "
                f"au "
                f"{ancienne_location.date_fin}."

            )

        return data