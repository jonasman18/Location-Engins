from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Utilisateur


@admin.register(Utilisateur)
class UtilisateurAdmin(UserAdmin):

    model = Utilisateur

    list_display = (
        'id',
        'email',
        'nom',
        'telephone',
        'role',
        'is_staff',
        'is_active',
    )

    list_filter = (
        'role',
        'is_staff',
        'is_active',
    )

    ordering = (
        'id',
    )

    search_fields = (
        'email',
        'nom',
        'telephone',
    )

    readonly_fields = (
        'last_login',
        'date_creation',
    )

    fieldsets = (

        ('Connexion', {

            'fields': (
                'email',
                'password',
            )
        }),

        ('Informations personnelles', {

            'fields': (
                'nom',
                'telephone',
                'adresse',
            )
        }),

        ('Rôle utilisateur', {

            'fields': (
                'role',
            )
        }),

        ('Permissions', {

            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'groups',
                'user_permissions',
            )
        }),

        ('Dates importantes', {

            'fields': (
                'last_login',
                'date_joined',
            )
        }),
    )

    add_fieldsets = (

        (None, {

            'classes': ('wide',),

            'fields': (

                'email',
                'nom',
                'telephone',
                'adresse',
                'role',
                'password1',
                'password2',
                'is_staff',
                'is_active',
            ),
        }),
    )