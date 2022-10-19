from api.models import minutes_of_meeting
from api.serializers import MOMSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions

import sys


sys.path.append('../..')


class MOM(APIView):
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, uuid, *args, **kwargs):
        
        if minutes_of_meeting.objects.filter(uuid=uuid).exists():
            data = minutes_of_meeting.objects.get(uuid=uuid)
            serializer = MOMSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        return Response("", status=status.HTTP_404_NOT_FOUND)
    

    def put(self, request, uuid, *args, **kwargs):
        ''' Create/Update the record with given data. '''
        
        data = request.data
        if minutes_of_meeting.objects.filter(uuid=uuid).exists():
            record = minutes_of_meeting.objects.get(uuid=uuid)
            serializer = MOMSerializer(record, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = MOMSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self, request, uuid, *args, **kwargs):
        
        if minutes_of_meeting.objects.filter(uuid=uuid).exists():
            data = minutes_of_meeting.objects.get(uuid=uuid).delete()
            return Response("", status=status.HTTP_200_OK)
            
        return Response("", status=status.HTTP_404_NOT_FOUND)


class MOMAll(APIView):
    
    def get(self, request, *args, **kwargs):
        
        if minutes_of_meeting.objects.filter().exists():
            data = minutes_of_meeting.objects.filter()
            serializer = MOMSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        return Response("", status=status.HTTP_404_NOT_FOUND)
    
