from api.models import user
from api.serializers import userSerializer, userSimpleSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions

import sys


sys.path.append('../..')


class UserActions(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, uuid, *args, **kwargs):

        if user.objects.filter(uuid=uuid).exists():
            data = user.objects.get(uuid=uuid)
            serializer = userSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response("", status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, uuid, *args, **kwargs):

        if user.objects.filter(uuid=uuid).exists():
            data = user.objects.get(uuid=uuid).delete()
            return Response("", status=status.HTTP_200_OK)
            
        return Response("", status=status.HTTP_404_NOT_FOUND)


class UserAll(APIView):
    
    def get(self, request, *args, **kwargs):
        
        if user.objects.filter().exists():
            data = user.objects.filter()
            serializer = userSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response("", status=status.HTTP_404_NOT_FOUND)
    
    
class UserSimple(APIView):
    
    def get(self, request, *args, **kwargs):
        
        if user.objects.filter().exists():
            data = user.objects.filter()
            serializer = userSimpleSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response("", status=status.HTTP_404_NOT_FOUND)