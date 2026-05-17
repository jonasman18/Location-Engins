from django.contrib import admin

from .models import Reservation


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):

    list_display = (
        'client',
        'engin',
        'date_debut',
        'date_fin',
        'montant_total',
        'statut',
    )

    list_filter = (
        'statut',
    )

    search_fields = (
        'client__nom',
        'engin__nom',
    )