from django.urls import path

from .views import recu_pdf

urlpatterns = [

    path(
        'recus/<int:paiement_id>/',
        recu_pdf
    ),
]