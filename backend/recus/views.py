from django.http import HttpResponse

from .services import generate_recu


def recu_pdf(request, paiement_id):

    pdf = generate_recu(
        paiement_id
    )

    response = HttpResponse(
        pdf,
        content_type='application/pdf'
    )

    response[
        'Content-Disposition'
    ] = (
        f'attachment; '
        f'filename="recu_{paiement_id}.pdf"'
    )

    return response