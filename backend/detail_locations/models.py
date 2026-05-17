from django.db import models

from locations.models import Location

from engins.models import Engin


class DetailLocation(models.Model):

    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name='details'
    )

    engin = models.ForeignKey(
        Engin,
        on_delete=models.CASCADE
    )

    prix_jour = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    quantite = models.IntegerField(
        default=1
    )

    nb_jours = models.IntegerField()

    prix_total = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    def __str__(self):

        return f"{self.location.id} - {self.engin.nom}"