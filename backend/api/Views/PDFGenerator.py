from tkinter import Canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Frame, PageTemplate, BaseDocTemplate
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.colors import black, white

from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

from PIL import Image
from pathlib import Path
import os


CURRENT_DIR = Path(__file__).resolve().parent

pdfmetrics.registerFont(TTFont('Calibri', os.path.join(CURRENT_DIR, r"assets\Calibri.ttf")))
pdfmetrics.registerFont(TTFont('Calibri-bold', os.path.join(CURRENT_DIR, r"assets\calibrib.ttf")))
pdfmetrics.registerFont(TTFont('Calibri-light', os.path.join(CURRENT_DIR, r"assets\calibril.ttf")))

registerFontFamily('Calibri', normal='Calibri', bold='Calibri-bold')

width, height = A4
styles = getSampleStyleSheet()

phone_num_style =  ParagraphStyle('phone_num_style',
                           fontSize=10,
                           fontName='Calibri',
                           parent=styles['Normal'],
                           textColor=black)

footer_white =  ParagraphStyle('phone_num_style',
                           fontSize=10,
                           fontName='Calibri',
                           parent=styles['Normal'],
                           textColor=white)



def header_footer(canvas : canvas.Canvas, doc: SimpleDocTemplate):
    
    # Header code
    image_path = os.path.join(CURRENT_DIR, r"assets\\logo.png")
    image = Image.open(image_path)
    im_width, im_height = image.size
    aspect_ratio = im_width/ im_height
    indented_width = 7*cm
    
    image.close()
    
    # Draw logo on top right of screen
    canvas.drawImage(image_path, 
                     doc.width + doc.leftMargin - indented_width + 1*cm, 
                     doc.height + doc.bottomMargin + doc.topMargin - indented_width/aspect_ratio - 1*cm, 
                     width=indented_width, height=indented_width/aspect_ratio)


    # Footer code
    image_path = os.path.join(CURRENT_DIR, r"assets\\footerTemplate.png")
    image = Image.open(image_path)
    im_width, im_height = image.size
    aspect_ratio = im_width/ im_height
    indented_width = A4[0]
    
    image.close()
    
    # Draw footer on bottom of screen
    canvas.drawImage(image_path, 0, 0, width=indented_width, height=indented_width/aspect_ratio)
    
    canvas.saveState()
    
    phone_num = Paragraph("+91 12345 67890", style=phone_num_style)
    w, h = phone_num.wrap(4*cm, 1.5*cm)
    phone_num.drawOn(canvas, doc.leftMargin + 1.7*cm, doc.bottomMargin/2 + 0.2*cm)
    
    email = Paragraph("dummy@contact.com", style=footer_white)
    w, h = email.wrap(4*cm, 1.5*cm)
    email.drawOn(canvas, doc.leftMargin + 7.1*cm, doc.bottomMargin/2 + 0.2*cm)
    
    website = Paragraph("www.dummy_website.com", style=footer_white)
    w, h = website.wrap(4*cm, 1.5*cm)
    website.drawOn(canvas, doc.leftMargin + 7.1*cm, doc.bottomMargin/2 - 0.8*cm)
    
    address = Paragraph("123 Building 456, Road 1, Region 1, City Name", style=footer_white)
    w, h = address.wrap(4*cm, 3*cm)
    address.drawOn(canvas, doc.leftMargin + 13.3*cm, doc.bottomMargin/2 - 0.1*cm)
    
    canvas.restoreState()




doc = BaseDocTemplate("Header.pdf", showBoundary=1, 
                        leftMargin=2*cm, rightMargin=2*cm, topMargin=4*cm, bottomMargin=2.5*cm,
                        title="MoM")

story = [Paragraph("This is a simple body text", styles['Normal'])] * 100

frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='normal')
template = PageTemplate(id='test', frames=frame, onPage=header_footer)

doc.addPageTemplates([template])
doc.build(story)



'''
heading = styles['Heading1']
body = styles['Normal']

story = []

story.append(Paragraph("Heading 1", heading))
story.append(Paragraph("This is the body text" * 50, body))

canvasObj = canvas.Canvas("Frames.pdf")
pageFrame = Frame(2*cm, 1*cm, width-3*cm, height-2*cm, showBoundary=1)
pageFrame.addFromList(story, canvasObj)
canvasObj.save()
'''


'''
def handleFirstPage(canvas: canvas.Canvas, doc):
    canvas.saveState()
    canvas.setFillColorRGB(255, 0, 0)
    canvas.setStrokeColorRGB(0, 255, 0)
    canvas.drawString(inch, 0.75*inch, "First page")
    canvas.restoreState()


def handleLaterPages(canvas: canvas.Canvas, doc):
    canvas.saveState()
    canvas.setFillColorRGB(255, 0, 0)
    canvas.setStrokeColorRGB(0, 255, 0)
    canvas.drawString(inch, 0.75*inch, f"Page {doc.page}")
    canvas.restoreState()



doc = SimpleDocTemplate("platypus.pdf")
Story = [Spacer(1, 0*inch)]
style = styles['Normal']

for i in range(100):
    text = f'Paragraph num: {i+1}'
    p = Paragraph(text, style)
    Story.append(p)
    Story.append(Spacer(1, 0.2*inch))

doc.build(Story, onFirstPage=handleFirstPage, onLaterPages=handleLaterPages)
'''