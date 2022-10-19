from api.models import user
from api.serializers import userSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions

import sys

sys.path.append('../..')


class UserActions(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, uid, *args, **kwargs):

        if user.objects.filter(uid=uid).exists():
            data = user.objects.get(uid=uid)
            serializer = userSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response("", status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, uid, *args, **kwargs):

        if user.objects.filter(uid=uid).exists():
            data = user.objects.get(uid=uid).delete()
            return Response("", status=status.HTTP_200_OK)
            
        return Response("", status=status.HTTP_404_NOT_FOUND)


class UserAll(APIView):
    
    def get(self, request, *args, **kwargs):
        
        if user.objects.filter().exists():
            data = user.objects.filter()
            serializer = userSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response("", status=status.HTTP_404_NOT_FOUND)