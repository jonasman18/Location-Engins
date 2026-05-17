from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)

from django.utils import timezone


# =========================================================
# USER MANAGER
# =========================================================

class UtilisateurManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError("L'email est obligatoire")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields
        )

        user.set_password(password)

        user.save(using=self._db)

        return user


    def create_superuser(self, email, password=None, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')

        return self.create_user(
            email,
            password,
            **extra_fields
        )


# =========================================================
# USER MODEL
# =========================================================

class Utilisateur(AbstractBaseUser, PermissionsMixin):

    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('client', 'Client'),
    )

    nom = models.CharField(max_length=100)

    email = models.EmailField(
        unique=True
    )

    telephone = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    adresse = models.TextField(
        blank=True,
        null=True
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='client'
    )

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)

    date_creation = models.DateTimeField(
        default=timezone.now
    )

    objects = UtilisateurManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['nom']

    def __str__(self):
        return self.email