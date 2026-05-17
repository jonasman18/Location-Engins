from io import BytesIO
import os

from django.conf import settings
from django.shortcuts import get_object_or_404

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image
)

from reportlab.lib import colors

from reportlab.lib.styles import getSampleStyleSheet

from reportlab.lib.pagesizes import A4

from reportlab.platypus.flowables import HRFlowable

from reportlab.platypus import KeepTogether

from reportlab.lib.enums import TA_CENTER, TA_RIGHT

from reportlab.lib.styles import ParagraphStyle

from paiements.models import Paiement


def generate_recu(paiement_id):

    paiement = get_object_or_404(
        Paiement,
        id=paiement_id
    )

    location = paiement.location

    utilisateur = location.utilisateur

    # =====================================
    # FORMAT DATES
    # =====================================

    date_debut = location.date_debut.strftime(
        "%d/%m/%Y"
    )

    date_fin = location.date_fin.strftime(
        "%d/%m/%Y"
    )

    date_paiement = paiement.date_paiement.strftime(
        "%d/%m/%Y à %H:%M"
    )

    # =====================================
    # PDF
    # =====================================

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()

    elements = []

    # =====================================
    # STYLES PERSONNALISES
    # =====================================

    title_style = styles['Title']

    title_style.textColor = colors.HexColor(
        "#2563eb"
    )

    title_style.fontSize = 24

    title_style.leading = 30

    title_style.alignment = TA_CENTER

    info_style = ParagraphStyle(
        'info_style',
        parent=styles['Normal'],
        fontSize=11,
        leading=20,
        textColor=colors.HexColor("#334155")
    )

    signature_style = ParagraphStyle(
        'signature_style',
        parent=styles['Normal'],
        alignment=TA_RIGHT,
        fontSize=11
    )

            # =====================================
    # ENTETE
    # =====================================

    logo_path = os.path.join(
        settings.BASE_DIR,
        "static",
        "logo.png"
    )

    # Logo
    if os.path.exists(logo_path):

        logo = Image(
            logo_path,
            width=55,
            height=55
        )

    else:

        logo = Paragraph(
            "",
            styles['Normal']
        )

    # Titre
    title_paragraph = Paragraph(
        "REÇU DE PAIEMENT",
        title_style
    )

    # TABLE LOGO + TITRE
    header_table = Table(

        [[
            logo,
            title_paragraph
        ]],

        colWidths=[70, 390]
    )

    header_table.setStyle(

        TableStyle([

            (
                'VALIGN',
                (0, 0),
                (-1, -1),
                'MIDDLE'
            ),

            (
                'ALIGN',
                (0, 0),
                (0, 0),
                'CENTER'
            ),

            (
                'LEFTPADDING',
                (0, 0),
                (-1, -1),
                0
            ),

            (
                'RIGHTPADDING',
                (0, 0),
                (-1, -1),
                0
            ),
        ])
    )

    elements.append(header_table)

    elements.append(
        Spacer(1, 8)
    )

    elements.append(

        Paragraph(
            "Location d'engins",
            ParagraphStyle(
                'subtitle',
                parent=styles['Normal'],
                alignment=TA_CENTER,
                textColor=colors.HexColor("#64748b"),
                fontSize=11
            )
        )
    )

    elements.append(
        Spacer(1, 15)
    )

    elements.append(

        HRFlowable(
            width="100%",
            thickness=1,
            color=colors.HexColor("#cbd5e1")
        )
    )

    elements.append(
        Spacer(1, 25)
    )
    # =====================================
    # INFOS CLIENT
    # =====================================

    infos = [

        f"<b>Client :</b> {utilisateur.nom}",

        f"<b>Location :</b> #{location.id}",

        f"<b>Période :</b> "
        f"{date_debut} au {date_fin}",

        f"<b>Statut :</b> Paiement reçu"
    ]

    for info in infos:

        elements.append(

            Paragraph(
                info,
                info_style
            )
        )

    elements.append(
        Spacer(1, 25)
    )

    # =====================================
    # TABLEAU
    # =====================================

    data = [

        [
            "Désignation",
            "Valeur"
        ],

        [
            "Montant payé",
            f"{paiement.montant} Ar"
        ],

        [
            "Mode de paiement",
            paiement.mode_paiement
        ],

        [
            "Référence transaction",
            paiement.reference_transaction
            or "-"
        ],

        [
            "Date du paiement",
            date_paiement
        ]
    ]

    table = Table(
        data,
        colWidths=[230, 230]
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
                11
            ),

            (
                'BOTTOMPADDING',
                (0, 0),
                (-1, 0),
                12
            ),

            (
                'TOPPADDING',
                (0, 0),
                (-1, 0),
                12
            ),

            # BODY
            (
                'BACKGROUND',
                (0, 1),
                (-1, -1),
                colors.white
            ),

            (
                'TEXTCOLOR',
                (0, 1),
                (-1, -1),
                colors.HexColor("#1e293b")
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
                10
            ),

            (
                'GRID',
                (0, 0),
                (-1, -1),
                1,
                colors.HexColor("#cbd5e1")
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

            (
                'VALIGN',
                (0, 0),
                (-1, -1),
                'MIDDLE'
            ),
        ])
    )

    elements.append(table)

    elements.append(
        Spacer(1, 50)
    )

    # =====================================
    # SIGNATURE
    # =====================================

    signature = KeepTogether([

        Paragraph(
            "Fait pour servir et valoir ce que de droit.",
            signature_style
        ),

        Spacer(1, 35),

        Paragraph(
            "____________________________",
            signature_style
        ),

        Paragraph(
            "<b>Signature & Cachet</b>",
            signature_style
        ),
    ])

    elements.append(signature)

    # =====================================
    # BUILD
    # =====================================

    doc.build(elements)

    pdf = buffer.getvalue()

    buffer.close()

    return pdf