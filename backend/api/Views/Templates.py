from api.models import minutes_of_meeting
from api.serializers import MOMSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions

from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile

import sys


sys.path.append('../..')


model = {'mom': minutes_of_meeting}
serializer = {'mom': MOMSerializer}


class Templates(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, resource, uuid, *args, **kwargs):

        if resource not in model:
            return Response('Resource does not exist', status=status.HTTP_400_BAD_REQUEST)

        try:
            record = model[resource].objects.get(uuid=uuid)
            context = MOMSerializer(record).data

            html_string = render_to_string(
                'templates/MOM.html', context)
            html = HTML(string=html_string)
            result = html.write_pdf()

            # http response
            response = HttpResponse(content_type='application/pdf;')
            response['Content-Disposition'] = 'inline; filename=MOM.pdf'
            response['Content-Transfer-Encoding'] = 'binary'
            with tempfile.NamedTemporaryFile(delete=True) as output:
                output.write(result)
                output.flush()
                output = open(output.name, 'rb')
                response.write(output.read())

            return response

        except model[resource].DoesNotExist:
            return Response('Record not found', status=status.HTTP_404_NOT_FOUND)
