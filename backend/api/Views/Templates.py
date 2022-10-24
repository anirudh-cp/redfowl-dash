from api.models import minutes_of_meeting, user
from api.serializers import MOMSerializer, userSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions

import io
from django.http import FileResponse
from .PDFGenerator import ReportGenerator

import sys


sys.path.append('../..')


model = {'mom': minutes_of_meeting}
serializer = {'mom': MOMSerializer}


class Templates(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, resource, uuid, *args, **kwargs):

        if resource not in model:
            return Response('Resource does not exist', status=status.HTTP_400_BAD_REQUEST)

        try:
            record = model[resource].objects.get(uuid=uuid)
            context = MOMSerializer(record).data
            
            members = []
            for member_uuid in context['members']:
                members.append(userSerializer(user.objects.get(uuid=member_uuid)).data['name'])
            context['members'] = members
            context['title'] = 'Minutes of Meeting'
            
            buffer = io.BytesIO()
            reportObj = ReportGenerator(buffer)
            reportObj.build(context)
            
            buffer.seek(0)
            return FileResponse(buffer, as_attachment=True, filename='MoM.pdf')
        

        except model[resource].DoesNotExist:
            return Response('Record not found', status=status.HTTP_404_NOT_FOUND)