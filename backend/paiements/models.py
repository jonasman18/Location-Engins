from django.db import models

from locations.models import Location


class Paiement(models.Model):

    MODE_CHOICES = (

        ('espece', 'Espèce'),

        ('mobile_money', 'Mobile Money'),

        ('virement', 'Virement'),
    )

    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name='paiements'
    )

    date_paiement = models.DateTimeField(
        auto_now_add=True
    )

    montant = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    mode_paiement = models.CharField(
        max_length=30,
        choices=MODE_CHOICES
    )

    reference_transaction = models.CharField(
        max_length=150,
        blank=True,
        null=True
    )

    def __str__(self):

        return f"Paiement #{self.id}"