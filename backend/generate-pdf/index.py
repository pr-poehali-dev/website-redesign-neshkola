import json
import base64
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from io import BytesIO
import os
import urllib.request

GREEN = colors.HexColor('#00B33C')
PURPLE = colors.HexColor('#7B3FA0')
LIGHT_GREEN = colors.HexColor('#e8f9ef')
LIGHT_PURPLE = colors.HexColor('#f3eaf9')
DARK = colors.HexColor('#1a0f2e')
GRAY = colors.HexColor('#6b7280')
WHITE = colors.white

SCHEDULE = [
    ('Понедельник', ['9:00 Логопед (инд.)', '10:00 Учусь читать 4–5 лет', '16:00 Подготовка к школе', '17:30 Английский (группа)']),
    ('Вторник',     ['10:00 ИЗО студия', '11:30 Нейробика', '16:00 Ментальная арифметика', '17:30 Психолог (инд.)']),
    ('Среда',       ['9:00 Логопед (инд.)', '10:00 Подготовка к школе', '16:00 Английский (группа)', '17:30 Русский язык + ВПР']),
    ('Четверг',     ['10:00 Пластилинка', '11:30 Школа внимания', '16:00 Математика 2–4 класс', '17:30 Английский (инд.)']),
    ('Пятница',     ['9:00 Логопед (инд.)', '10:00 Техника чтения', '16:00 Нейролепка', '17:30 Ментальная арифметика']),
    ('Суббота',     ['10:00 Песочная сказка', '11:30 ИЗО / Креативное рисование', '13:00 Подготовка к школе (экспресс)', '14:30 Сам себе психолог']),
]

PROGRAMS = [
    ('Подготовка к школе', ['Подготовка к школе / Экспресс', 'Подготовка к школе 2 года', 'Подготовка к школе — индивидуально', 'Учусь читать (4–5 лет)', 'Учусь читать (6–7 лет)', 'Техника чтения']),
    ('Школьные предметы',  ['Русский язык + ВПР + коррекция почерка', 'Математика: 2, 3, 4 класс', 'Ментальная арифметика', 'Развитие памяти (мнемотехника)', 'Школа внимания']),
    ('Английский язык',    ['Группа 2 раза в неделю', 'Группа 1 раз в неделю', 'Индивидуально', 'Индивидуально 1 раз в неделю']),
    ('Творчество',         ['ИЗО студия / Креативное рисование', 'Школа настроения', 'Песочная анимация', 'Интерьерная картина', 'Пластилинка']),
    ('Нейро-направления',  ['Нейробика', 'Нейролепка', 'Песочная сказка']),
    ('Психология и помощь',['Сам себе психолог', 'Сам себе психолог для подростков', 'Психолог', 'Логопед', 'Репетитор — индивидуально', 'Репетитор — мини-группа']),
]

CONTACTS = [
    ('ЧУ ДПО УЦ «ЗНАНИЯ»', 'Псков, Ольгинская набережная, 9а, 3 этаж', '+7 (911) 353-10-01'),
    ('ИП Захарова А. Н.',   'Псков, ул. Инженерная, 125',                '+7 (911) 353-10-00'),
]

def load_font():
    font_url = 'https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDDkhRjQhCC4.woff2'
    try:
        req = urllib.request.urlopen(font_url, timeout=5)
        data = req.read()
    except Exception:
        return False
    font_path = '/tmp/Nunito.woff2'
    with open(font_path, 'wb') as f:
        f.write(data)
    return False

def build_pdf():
    buf = BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4,
                            leftMargin=15*mm, rightMargin=15*mm,
                            topMargin=12*mm, bottomMargin=12*mm)

    styles = getSampleStyleSheet()
    h1 = ParagraphStyle('h1', fontSize=22, textColor=GREEN, fontName='Helvetica-Bold',
                         alignment=TA_CENTER, spaceAfter=2*mm)
    sub = ParagraphStyle('sub', fontSize=10, textColor=PURPLE, fontName='Helvetica-Bold',
                          alignment=TA_CENTER, spaceAfter=6*mm)
    h2 = ParagraphStyle('h2', fontSize=13, textColor=WHITE, fontName='Helvetica-Bold',
                          alignment=TA_LEFT, spaceBefore=4*mm, spaceAfter=2*mm)
    body = ParagraphStyle('body', fontSize=9, textColor=DARK, fontName='Helvetica',
                           leading=13, spaceAfter=1*mm)
    small = ParagraphStyle('small', fontSize=8, textColor=GRAY, fontName='Helvetica',
                            leading=12)

    story = []

    # Header
    story.append(Paragraph('НЕШКОЛА', h1))
    story.append(Paragraph('Детский центр — Территория знаний', sub))
    story.append(HRFlowable(width='100%', thickness=2, color=GREEN, spaceAfter=6*mm))

    # Schedule section
    sched_header = Table(
        [[Paragraph('РАСПИСАНИЕ ЗАНЯТИЙ', ParagraphStyle('sh', fontSize=13, textColor=WHITE, fontName='Helvetica-Bold', alignment=TA_CENTER))]],
        colWidths=[180*mm]
    )
    sched_header.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), PURPLE),
        ('ROUNDEDCORNERS', [6]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(sched_header)
    story.append(Spacer(1, 4*mm))

    col_w = 180*mm / 6
    day_headers = [[Paragraph(d, ParagraphStyle('dh', fontSize=8, textColor=WHITE, fontName='Helvetica-Bold', alignment=TA_CENTER)) for d, _ in SCHEDULE]]
    max_items = max(len(items) for _, items in SCHEDULE)
    rows = [day_headers]
    for i in range(max_items):
        row = []
        for _, items in SCHEDULE:
            if i < len(items):
                time_part, *rest = items[i].split(' ', 1)
                text = f'<b>{time_part}</b> {rest[0] if rest else ""}'
                row.append(Paragraph(text, ParagraphStyle('ci', fontSize=7.5, textColor=DARK, fontName='Helvetica', leading=10, alignment=TA_LEFT)))
            else:
                row.append('')
        rows.append(row)

    sched_table = Table(rows, colWidths=[col_w]*6)
    sched_style = [
        ('BACKGROUND', (0,0), (-1,0), GREEN),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e0e0e0')),
    ]
    for i in range(1, len(rows)):
        bg = LIGHT_GREEN if i % 2 == 1 else WHITE
        sched_style.append(('BACKGROUND', (0,i), (-1,i), bg))
    sched_table.setStyle(TableStyle(sched_style))
    story.append(sched_table)
    story.append(Spacer(1, 6*mm))

    # Programs section
    prog_header = Table(
        [[Paragraph('НАШИ ПРОГРАММЫ', ParagraphStyle('ph', fontSize=13, textColor=WHITE, fontName='Helvetica-Bold', alignment=TA_CENTER))]],
        colWidths=[180*mm]
    )
    prog_header.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), GREEN),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(prog_header)
    story.append(Spacer(1, 4*mm))

    prog_cols = [PROGRAMS[:3], PROGRAMS[3:]]
    col_data = []
    for col in prog_cols:
        cell_parts = []
        for cat, items in col:
            cell_parts.append(Paragraph(f'<b>{cat}</b>', ParagraphStyle('cat', fontSize=9, textColor=PURPLE, fontName='Helvetica-Bold', leading=13)))
            for item in items:
                cell_parts.append(Paragraph(f'• {item}', small))
            cell_parts.append(Spacer(1, 2*mm))
        col_data.append(cell_parts)

    prog_table = Table([[col_data[0], col_data[1]]], colWidths=[88*mm, 88*mm])
    prog_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(prog_table)
    story.append(Spacer(1, 6*mm))

    # Contacts section
    HRFlowable(width='100%', thickness=1, color=PURPLE, spaceAfter=4*mm)
    contacts_header = Table(
        [[Paragraph('КОНТАКТЫ', ParagraphStyle('ch', fontSize=13, textColor=WHITE, fontName='Helvetica-Bold', alignment=TA_CENTER))]],
        colWidths=[180*mm]
    )
    contacts_header.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), PURPLE),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(contacts_header)
    story.append(Spacer(1, 4*mm))

    contact_cells = []
    for name, addr, phone in CONTACTS:
        contact_cells.append([
            Paragraph(f'<b>{name}</b>', ParagraphStyle('cn', fontSize=10, textColor=PURPLE, fontName='Helvetica-Bold', leading=14)),
            Paragraph(addr, ParagraphStyle('ca', fontSize=9, textColor=DARK, fontName='Helvetica', leading=12)),
            Paragraph(phone, ParagraphStyle('cp', fontSize=10, textColor=GREEN, fontName='Helvetica-Bold', leading=14)),
        ])

    contacts_table = Table(contact_cells, colWidths=[55*mm, 85*mm, 40*mm])
    contacts_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_PURPLE),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#d8c5f0')),
        ('BACKGROUND', (0,1), (-1,1), LIGHT_GREEN),
        ('GRID', (0,1), (-1,1), 0.5, colors.HexColor('#b8e8c8')),
    ]))
    story.append(contacts_table)

    story.append(Spacer(1, 4*mm))
    story.append(Paragraph('neshkola60.ru', ParagraphStyle('site', fontSize=9, textColor=GRAY, fontName='Helvetica', alignment=TA_CENTER)))

    doc.build(story)
    buf.seek(0)
    return buf.read()


def handler(event: dict, context) -> dict:
    """Генерирует PDF-буклет центра НЕШКОЛА с расписанием, программами и контактами."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }

    pdf_bytes = build_pdf()
    pdf_b64 = base64.b64encode(pdf_bytes).decode('utf-8')

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="neshkola-schedule.pdf"',
        },
        'body': pdf_b64,
        'isBase64Encoded': True,
    }
