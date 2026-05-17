from django.db import models


class Categorie(models.Model):

    nom = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    def __str__(self):

        return self.nom

class Engin(models.Model):

    ETAT_CHOICES = (

        ('disponible', 'Disponible'),

        ('loue', 'Loué'),

        ('en_maintenance', 'En maintenance'),
    )

    nom = models.CharField(
        max_length=150
    )

    categorie = models.ForeignKey(
        Categorie,
        on_delete=models.CASCADE,
        related_name='engins'
    )

    description = models.TextField()

    prix_jour = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    image = models.ImageField(
        upload_to='engins/',
        blank=True,
        null=True
    )

    etat = models.CharField(
        max_length=20,
        choices=ETAT_CHOICES,
        default='disponible'
    )

    date_creation = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.nom    
