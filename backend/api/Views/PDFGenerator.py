from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Frame, PageTemplate, BaseDocTemplate
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.colors import black, white
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT, TA_CENTER, TA_RIGHT

from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

from PIL import Image
from pathlib import Path
import os


CURRENT_DIR = Path(__file__).resolve().parent

pdfmetrics.registerFont(
    TTFont('Calibri', os.path.join(CURRENT_DIR, r"assets\Calibri.ttf")))
pdfmetrics.registerFont(
    TTFont('Calibri-bold', os.path.join(CURRENT_DIR, r"assets\calibrib.ttf")))
pdfmetrics.registerFont(
    TTFont('Calibri-light', os.path.join(CURRENT_DIR, r"assets\calibril.ttf")))
pdfmetrics.registerFont(
    TTFont('Calibri-italic', os.path.join(CURRENT_DIR, r"assets\calibri_italic.ttf")))


registerFontFamily('Calibri', normal='Calibri', bold='Calibri-bold', italic='Calibri-italic')


class ReportGenerator:

    def __init__(self, buffer):

        self.width, self.height = A4
        self.sampleStyles = getSampleStyleSheet()

        self.phone_num_style = ParagraphStyle('phone_num_style',
                                              fontSize=10,
                                              fontName='Calibri',
                                              parent=self.sampleStyles['Normal'],
                                              textColor=black)

        self.footer_white = ParagraphStyle('footer_white',
                                           fontSize=10,
                                           fontName='Calibri',
                                           parent=self.sampleStyles['Normal'],
                                           textColor=white)

        self.body_text = ParagraphStyle('body_text',
                                        fontSize=15,
                                        fontName='Calibri',
                                        leading=18,
                                        parent=self.sampleStyles['Normal'])
        
        self.body_text_bold = ParagraphStyle('body_text_bold',
                                        fontSize=15,
                                        fontName='Calibri-bold',
                                        parent=self.sampleStyles['Normal'])
        
        self.body_text_italic = ParagraphStyle('body_text_italic',
                                        fontSize=15,
                                        fontName='Calibri-italic',
                                        parent=self.sampleStyles['Normal'])

        self.title_text = ParagraphStyle('title_text',
                                         fontSize=30,
                                         fontName='Calibri-bold',
                                         alignment=TA_CENTER,
                                         parent=self.sampleStyles['Normal'])

        self.doc = BaseDocTemplate(buffer, showBoundary=0,
                                   leftMargin=2*cm, rightMargin=2*cm, topMargin=4*cm, bottomMargin=2.5*cm,
                                   title="MoM", author='Redfowl Infotech')

        self.mainFrame = Frame(self.doc.leftMargin, self.doc.bottomMargin,
                               self.doc.width, self.doc.height, id='normal')
        self.pageTemplate = PageTemplate(
            id='test', frames=self.mainFrame, onPage=self.header_footer)

        self.doc.addPageTemplates([self.pageTemplate])

    def build(self, content):

        header = f'<para align="right"> {content["venue"]}, {content["date"]} </para>'
        members = (f'Attended by {", ".join(x for x in content["members"])} '
                   f'and {", ".join(x for x in content["additional_members"])}')

        salutation = 'Warm regards, '
        signature_byline = 'Dr. Rajakumar Arul'
        designation = 'Founder & CEO'
        
        validation_contact = 'For validating this certificate, you can reach us at <u> <a color="blue"> hr@redfowlinfotech.com</a> </u>'

        story = [Paragraph(header, self.body_text),
                 Spacer(1, 0.7*cm),
                 Paragraph(content['title'], self.title_text),
                 Spacer(1, 2.5*cm),
                 Paragraph(members, self.body_text),
                 Spacer(1, 1*cm),
                 Paragraph(content['description'], self.body_text),
                 Spacer(1, 1.5*cm),
                 Paragraph(salutation, self.body_text),
                 Spacer(1, 2.5*cm),
                 Paragraph(signature_byline, self.body_text_bold),
                 Spacer(1, 0.3*cm),
                 Paragraph(designation, self.body_text_italic),
                 Spacer(1, 5*cm),
                 Paragraph(validation_contact, self.body_text)
                 ]
        self.doc.build(story)

    def header_footer(self, canvas: canvas.Canvas, doc: SimpleDocTemplate):

        # Header code
        image_path = os.path.join(CURRENT_DIR, r"assets\\logo.png")
        image = Image.open(image_path)
        im_width, im_height = image.size
        aspect_ratio = im_width / im_height
        indented_width = 7*cm

        image.close()

        # Draw logo on top right of screen
        canvas.drawImage(image_path,
                         doc.width + doc.leftMargin - indented_width + 1*cm,
                         doc.height + doc.bottomMargin + doc.topMargin -
                         indented_width/aspect_ratio - 1*cm,
                         width=indented_width, height=indented_width/aspect_ratio)

        # Footer code
        image_path = os.path.join(CURRENT_DIR, r"assets\\footerTemplate.png")
        image = Image.open(image_path)
        im_width, im_height = image.size
        aspect_ratio = im_width / im_height
        indented_width = A4[0]

        image.close()

        # Draw footer on bottom of screen
        canvas.drawImage(image_path, 0, 0, width=indented_width,
                         height=indented_width/aspect_ratio)

        canvas.saveState()

        phone_num = Paragraph("+91 12345 67890", style=self.phone_num_style)
        w, h = phone_num.wrap(4*cm, 1.5*cm)
        phone_num.drawOn(canvas, doc.leftMargin + 1.7 *
                         cm, doc.bottomMargin/2 + 0.2*cm)

        email = Paragraph("dummy@contact.com", style=self.footer_white)
        w, h = email.wrap(4*cm, 1.5*cm)
        email.drawOn(canvas, doc.leftMargin + 7.1 *
                     cm, doc.bottomMargin/2 + 0.2*cm)

        website = Paragraph("www.dummy_website.com", style=self.footer_white)
        w, h = website.wrap(4*cm, 1.5*cm)
        website.drawOn(canvas, doc.leftMargin + 7.1 *
                       cm, doc.bottomMargin/2 - 0.8*cm)

        address = Paragraph(
            "123 Building 456, Road 1, Region 1, City Name", style=self.footer_white)
        w, h = address.wrap(4*cm, 3*cm)
        address.drawOn(canvas, doc.leftMargin + 13.3 *
                       cm, doc.bottomMargin/2 - 0.1*cm)

        canvas.restoreState()

        # Fowl logo code
        image_path = os.path.join(CURRENT_DIR, r"assets\\background.png")
        image = Image.open(image_path)
        im_width, im_height = image.size
        aspect_ratio = im_width / im_height
        indented_width = 7*cm

        image.close()

        # Draw fowl logo on bottom of screen
        canvas.drawImage(image_path,
                         doc.width + doc.leftMargin - indented_width,
                         doc.height / 4,
                         width=indented_width, height=indented_width/aspect_ratio, mask='auto')




# object = ReportGenerator('MoM.pdf')
# object.build({'date': "2022-10-01", "venue": "Place",
#               "members": ['person 1', 'person 2', 'person 3'],
#               'additional_members': ['External 1', 'External 2'],
#               'title': 'Minutes of the Meeting',
#               'description':
#               '''Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis viverra nibh cras pulvinar mattis nunc sed. Facilisis mauris sit amet massa vitae tortor. Quam nulla porttitor massa id neque aliquam. Et pharetra pharetra massa massa ultricies mi. Hac habitasse platea dictumst quisque sagittis purus sit amet. Natoque penatibus et magnis dis. Dignissim sodales ut eu sem integer vitae. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Sit amet risus nullam eget felis. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel.

# Orci a scelerisque purus semper eget duis. Dolor purus non enim praesent elementum. Est placerat in egestas erat imperdiet. Felis eget velit aliquet sagittis id. Sed risus ultricies tristique nulla aliquet enim tortor at. Amet consectetur adipiscing elit pellentesque habitant morbi tristique. Iaculis eu non diam phasellus vestibulum. Integer eget aliquet nibh praesent tristique magna. Eget lorem dolor sed viverra ipsum. Tempor orci dapibus ultrices in iaculis. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Ut diam quam nulla porttitor massa. Libero volutpat sed cras ornare arcu dui vivamus. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Tellus mauris a diam maecenas sed enim. Est ante in nibh mauris cursus.

# Mi ipsum faucibus vitae aliquet nec. Commodo elit at imperdiet dui accumsan sit amet nulla. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum. Egestas integer eget aliquet nibh praesent tristique magna sit. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Ultrices dui sapien eget mi proin. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Turpis massa sed elementum tempus egestas. Elementum integer enim neque volutpat ac tincidunt vitae semper. Morbi tristique senectus et netus. At lectus urna duis convallis convallis. Gravida rutrum quisque non tellus orci ac auctor. Tincidunt praesent semper feugiat nibh sed pulvinar.

# Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a. Eu tincidunt tortor aliquam nulla facilisi cras fermentum. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Eu sem integer vitae justo eget magna. Facilisis leo vel fringilla est. Nam aliquam sem et tortor consequat id porta nibh. Ut consequat semper viverra nam libero. Est sit amet facilisis magna etiam tempor. Faucibus purus in massa tempor nec feugiat nisl pretium. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Sit amet volutpat consequat mauris.

# Turpis tincidunt id aliquet risus feugiat in ante metus. Euismod elementum nisi quis eleifend. Volutpat ac tincidunt vitae semper. Purus sit amet luctus venenatis lectus magna. Mi bibendum neque egestas congue quisque egestas. Vel facilisis volutpat est velit. Vitae tortor condimentum lacinia quis. Leo vel orci porta non pulvinar neque laoreet suspendisse interdum. Facilisi nullam vehicula ipsum a arcu. Tristique sollicitudin nibh sit amet. Tortor posuere ac ut consequat semper viverra nam libero justo. Lacus luctus accumsan tortor posuere ac. Hendrerit gravida rutrum quisque non tellus orci ac. Nibh venenatis cras sed felis eget velit aliquet. Velit laoreet id donec ultrices.

# Auctor eu augue ut lectus arcu bibendum at varius. Pellentesque id nibh tortor id aliquet lectus proin. Egestas sed tempus urna et pharetra pharetra. Auctor eu augue ut lectus arcu. Ultricies mi eget mauris pharetra et ultrices neque. Enim lobortis scelerisque fermentum dui faucibus in ornare. Venenatis cras sed felis eget velit aliquet sagittis id. Malesuada pellentesque elit eget gravida. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Sed arcu non odio euismod. Interdum velit euismod in pellentesque massa placerat duis ultricies. Ornare massa eget egestas purus viverra accumsan in. Eget mi proin sed libero enim sed. Placerat vestibulum lectus mauris ultrices eros in cursus turpis. Amet est placerat in egestas erat. Egestas erat imperdiet sed euismod nisi. Aliquam ut porttitor leo a diam sollicitudin. Vitae justo eget magna fermentum iaculis eu non diam phasellus.

# Gravida neque convallis a cras semper auctor. Elementum integer enim neque volutpat ac tincidunt vitae semper. Quam vulputate dignissim suspendisse in est ante in nibh. Massa sapien faucibus et molestie ac feugiat. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Ipsum suspendisse ultrices gravida dictum fusce ut placerat. Ut porttitor leo a diam sollicitudin. Sit amet purus gravida quis blandit turpis. Nunc sed velit dignissim sodales. In aliquam sem fringilla ut morbi tincidunt. Faucibus in ornare quam viverra orci sagittis eu. Duis ultricies lacus sed turpis. Cursus euismod quis viverra nibh cras pulvinar mattis.
# '''})
