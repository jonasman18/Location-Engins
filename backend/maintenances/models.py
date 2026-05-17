from django.db import models

from engins.models import Engin


class Maintenance(models.Model):

    STATUT_CHOICES = [

        ('en_cours', 'En cours'),

        ('terminee', 'Terminée')
    ]

    engin = models.ForeignKey(
        Engin,
        on_delete=models.CASCADE,
        related_name='maintenances'
    )

    type_maintenance = models.CharField(
        max_length=100
    )

    description = models.TextField()

    date_debut = models.DateField()

    date_fin = models.DateField(
        null=True,
        blank=True
    )

    cout = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    statut = models.CharField(
        max_length=20,
        choices=STATUT_CHOICES,
        default='en_cours'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.engin.nom} - "
            f"{self.type_maintenance}"
        )
    
def save(self, *args, **kwargs):

    super().save(*args, **kwargs)

    if self.statut == 'en_cours':

        self.engin.statut_location = (
            'maintenance'
        )

    elif self.statut == 'terminee':

        self.engin.statut_location = (
            'disponible'
        )

    self.engin.save()