from django.urls import path

from .views import facture_pdf


urlpatterns = [

    path(
        'factures/<int:location_id>/',
        facture_pdf
    ),
]
