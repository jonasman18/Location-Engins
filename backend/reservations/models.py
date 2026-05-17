from django.db import models

from users.models import Utilisateur

from engins.models import Engin

from datetime import timedelta


class Reservation(models.Model):

    STATUT_CHOICES = (

        ('en_attente', 'En attente'),

        ('confirmee', 'Confirmée'),

        ('terminee', 'Terminée'),

        ('annulee', 'Annulée'),
    )

    client = models.ForeignKey(
        Utilisateur,
        on_delete=models.CASCADE
    )

    engin = models.ForeignKey(
        Engin,
        on_delete=models.CASCADE
    )

    date_debut = models.DateField()

    date_fin = models.DateField()

    montant_total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        blank=True,
        null=True
    )

    statut = models.CharField(
        max_length=20,
        choices=STATUT_CHOICES,
        default='en_attente'
    )

    date_creation = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):

        # =========================================
        # Vérification des dates
        # =========================================

        if self.date_fin < self.date_debut:

            raise ValueError(
                "La date de fin doit être après la date début"
            )

        # =========================================
        # Vérifier disponibilité engin
        # =========================================

        reservations = Reservation.objects.filter(

            engin=self.engin,

            date_debut__lte=self.date_fin,

            date_fin__gte=self.date_debut,

        ).exclude(id=self.id)

        if reservations.exists():

            raise ValueError(
                "Cet engin est déjà réservé pour cette période"
            )

        # =========================================
        # Calcul automatique montant
        # =========================================

        nb_jours = (
            self.date_fin - self.date_debut
        ).days + 1

        self.montant_total = (
            nb_jours * self.engin.prix_jour
        )

        super().save(*args, **kwargs)

    def __str__(self):

        return f"{self.client.nom} - {self.engin.nom}"