from rest_framework import serializers
from .models import *
from django.contrib.auth.models import Group


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields=('email', 'name', 'status', 'uuid', 'date_joined', 'is_superuser')


class userSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields=('name', 'uuid')


class RegistrationUserSerializer(serializers.ModelSerializer):
    
    password2 = serializers.CharField(style={'input_type': 'password'},
                                      write_only=True)
    
    class Meta:
        model = user
        fields = ('email', 'name', 'password', 'password2')
        extra_kwargs = {
			'password': {'write_only': True}
		}
        
    def save(self, **kwargs):
        print()
        userObj = user(email=self.validated_data['email'], name=self.validated_data['name'])
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        
        if password != password2:
            raise serializers.ValidationError({'Password': 'Passwords do not match.'})

        userObj.set_password(password)
        userObj.save()
        
        return userObj
