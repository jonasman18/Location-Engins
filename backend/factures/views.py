# factures/views.py

from django.http import HttpResponse
from .services import generate_facture


def facture_pdf(
    request,
    location_id
):

    pdf = generate_facture(
        location_id
    )

    return HttpResponse(
        pdf,
        content_type='application/pdf'
    )