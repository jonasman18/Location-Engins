from django.db import models

from users.models import Utilisateur


class Location(models.Model):

    STATUT_CHOICES = (

        ('en_cours', 'En cours'),
        ('terminee', 'Terminée'),
        ('retard', 'Retard'),
    )

    utilisateur = models.ForeignKey(
        Utilisateur,
        on_delete=models.CASCADE
    )

    date_location = models.DateTimeField(
        auto_now_add=True
    )

    date_debut = models.DateField()

    date_fin = models.DateField()

    statut = models.CharField(
        max_length=20,
        choices=STATUT_CHOICES,
        default='en_cours'
    )

    caution_versee = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    montant_total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    def __str__(self):

        return f"Location #{self.id}"