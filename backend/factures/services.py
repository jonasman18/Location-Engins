from io import BytesIO

from django.shortcuts import get_object_or_404

from locations.models import Location

from paiements.models import Paiement

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib import colors

from reportlab.lib.styles import (
    getSampleStyleSheet,
    ParagraphStyle
)

from reportlab.lib.enums import TA_CENTER

from reportlab.lib.pagesizes import A4

from reportlab.platypus.flowables import HRFlowable

from reportlab.pdfbase.ttfonts import TTFont

from reportlab.pdfbase import pdfmetrics

from decimal import Decimal


def generate_facture(location_id):

    # =========================================
    # LOCATION
    # =========================================

    location = get_object_or_404(
        Location,
        id=location_id
    )

    paiements = Paiement.objects.filter(
        location=location
    )

    # =========================================
    # PDF BUFFER
    # =========================================

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=30
    )

    # =========================================
    # STYLES
    # =========================================

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=24,
        leading=30,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=25
    )

    section_style = ParagraphStyle(
        'SectionStyle',
        parent=styles['Normal'],
        fontSize=11,
        leading=18,
        textColor=colors.HexColor("#334155")
    )

    total_style = ParagraphStyle(
        'TotalStyle',
        parent=styles['Normal'],
        fontSize=12,
        leading=22,
        textColor=colors.HexColor("#0f172a")
    )

    footer_style = ParagraphStyle(
        'FooterStyle',
        parent=styles['Normal'],
        alignment=TA_CENTER,
        fontSize=10,
        textColor=colors.grey
    )

    elements = []

    # =========================================
    # HEADER
    # =========================================

    elements.append(
        Paragraph(
            f"FACTURE LOCATION #{location.id}",
            title_style
        )
    )

    elements.append(
        HRFlowable(
            width="100%",
            thickness=1,
            color=colors.HexColor("#cbd5e1")
        )
    )

    elements.append(Spacer(1, 20))

    # =========================================
    # INFOS CLIENT
    # =========================================

    client_data = f"""
    <b>Client :</b> {location.utilisateur.nom}<br/>
    <b>Date location :</b> {location.date_location.strftime('%d/%m/%Y')}<br/>
    <b>Période :</b> {location.date_debut} au {location.date_fin}<br/>
    <b>Statut :</b> {location.statut}
    """

    elements.append(
        Paragraph(
            client_data,
            section_style
        )
    )

    elements.append(Spacer(1, 25))

    # =========================================
    # TABLE ENGINS
    # =========================================

    data = [[
        "Engin",
        "Prix / Jour",
        "Jours",
        "Total"
    ]]

    for detail in location.details.all():

        data.append([
            detail.engin.nom,
            f"{detail.prix_jour:,.2f} Ar",
            str(detail.nb_jours),
            f"{detail.prix_total:,.2f} Ar"
        ])

    table = Table(
        data,
        colWidths=[180, 110, 70, 120]
    )

    table.setStyle(
        TableStyle([

            # HEADER
            (
                'BACKGROUND',
                (0, 0),
                (-1, 0),
                colors.HexColor("#0f172a")
            ),

            (
                'TEXTCOLOR',
                (0, 0),
                (-1, 0),
                colors.white
            ),

            (
                'FONTNAME',
                (0, 0),
                (-1, 0),
                'Helvetica-Bold'
            ),

            (
                'FONTSIZE',
                (0, 0),
                (-1, 0),
                12
            ),

            (
                'BOTTOMPADDING',
                (0, 0),
                (-1, 0),
                12
            ),

            # BODY
            (
                'BACKGROUND',
                (0, 1),
                (-1, -1),
                colors.whitesmoke
            ),

            (
                'TEXTCOLOR',
                (0, 1),
                (-1, -1),
                colors.black
            ),

            (
                'FONTNAME',
                (0, 1),
                (-1, -1),
                'Helvetica'
            ),

            (
                'FONTSIZE',
                (0, 1),
                (-1, -1),
                11
            ),

            (
                'GRID',
                (0, 0),
                (-1, -1),
                1,
                colors.HexColor("#cbd5e1")
            ),

            (
                'ALIGN',
                (1, 1),
                (-1, -1),
                'CENTER'
            ),

            (
                'VALIGN',
                (0, 0),
                (-1, -1),
                'MIDDLE'
            ),

            (
                'BOTTOMPADDING',
                (0, 1),
                (-1, -1),
                10
            ),

            (
                'TOPPADDING',
                (0, 1),
                (-1, -1),
                10
            ),
        ])
    )

    elements.append(table)

    elements.append(Spacer(1, 30))

    # =========================================
    # CALCULS
    # =========================================

    montant_total = Decimal(
        location.montant_total
    )

    montant_paye = sum(
        (
            p.montant
            for p in paiements
        ),
        Decimal("0")
    )

    reste = montant_total - montant_paye

    # =========================================
    # TOTAUX
    # =========================================

    elements.append(
        Paragraph(
            f"<b>Montant total :</b> {montant_total:,.2f} Ar",
            total_style
        )
    )

    # Afficher seulement si payé > 0

    if montant_paye > 0:

        elements.append(
            Paragraph(
                f"<b>Montant payé :</b> {montant_paye:,.2f} Ar",
                total_style
            )
        )

    # Afficher seulement si reste > 0

    if reste > 0:

        elements.append(
            Paragraph(
                f"<b>Reste à payer :</b> {reste:,.2f} Ar",
                total_style
            )
        )

    else:

        elements.append(
            Paragraph(
                "<b style='color:green;'>FACTURE ENTIÈREMENT PAYÉE</b>",
                total_style
            )
        )

    elements.append(Spacer(1, 40))

    # =========================================
    # FOOTER
    # =========================================

    elements.append(
        HRFlowable(
            width="100%",
            thickness=1,
            color=colors.HexColor("#e2e8f0")
        )
    )

    elements.append(Spacer(1, 10))

    elements.append(
        Paragraph(
            "Merci pour votre confiance.",
            footer_style
        )
    )

    # =========================================
    # BUILD PDF
    # =========================================

    doc.build(elements)

    pdf = buffer.getvalue()

    buffer.close()

    return pdf