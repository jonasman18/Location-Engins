from rest_framework import serializers

from django.db.models import Sum

from .models import Paiement


class PaiementSerializer(
    serializers.ModelSerializer
):

    # =========================================
    # CLIENT
    # =========================================

    client_nom = serializers.CharField(
        source='location.utilisateur.nom',
        read_only=True
    )


    # =========================================
    # LOCATION TOTAL
    # =========================================

    montant_location = serializers.DecimalField(
        source='location.montant_total',
        max_digits=12,
        decimal_places=2,
        read_only=True
    )


    # =========================================
    # TOTAL PAYE
    # =========================================

    total_paye = serializers.SerializerMethodField()


    # =========================================
    # RESTE A PAYER
    # =========================================

    reste_a_payer = serializers.SerializerMethodField()


    # =========================================
    # STATUT PAIEMENT
    # =========================================

    statut_paiement = serializers.SerializerMethodField()


    class Meta:

        model = Paiement

        fields = '__all__'


    # =========================================
    # VALIDATION
    # =========================================

    def validate(self, data):

        location = data['location']

        montant = data['montant']

        total_paye = Paiement.objects.filter(
            location=location
        ).aggregate(
            total=Sum('montant')
        )['total'] or 0

        reste = location.montant_total - total_paye

        if montant > reste:

            raise serializers.ValidationError(
                {
                    "montant":
                    f"Le reste à payer est {reste} Ar"
                }
            )

        return data


    # =========================================
    # TOTAL PAYE
    # =========================================

    def get_total_paye(self, obj):

        total = Paiement.objects.filter(
            location=obj.location
        ).aggregate(
            total=Sum('montant')
        )['total']

        return total or 0


    # =========================================
    # RESTE A PAYER
    # =========================================

    def get_reste_a_payer(self, obj):

        total_paye =self.get_total_paye(obj)

        return (
            obj.location.montant_total
            - total_paye
        )


    # =========================================
    # STATUT PAIEMENT
    # =========================================

    def get_statut_paiement(self, obj):

        total_paye = self.get_total_paye(obj)

        montant_total = obj.location.montant_total

        if total_paye == 0:

            return "non_paye"

        if total_paye < montant_total:

            return "partiel"

        return "paye"