from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.postgres.fields import ArrayField

import uuid

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class user_manager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, email, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
        )
        
        user.is_staff = True
        user.is_superuser = True
        
        user.save(using=self._db)
        return user


class user(AbstractBaseUser):
    # 320 Characters is the max len of a email.
    
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    email = models.EmailField(max_length=320,  unique=True)
    name = models.CharField(max_length=128)
    passWrongCount = models.IntegerField(default=0)
    status = models.CharField(max_length=16, default="active")
    
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'

    objects = user_manager()

    def __str__(self):
        return self.uuid
    
    # For checking permissions. to keep it simple all STAFF have ALL permissons
    def has_perm(self, perm, obj=None):
        return self.is_staff


    # Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
    def has_module_perms(self, app_label):
        return True


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class minutes_of_meeting(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField()
    description = models.CharField(max_length=4096)
    venue = models.CharField(max_length=256, blank=True, null=True)
    members = models.ManyToManyField(user)
    additional_members = ArrayField(models.CharField(max_length=128), blank=True, null=True)
    
    def __str__(self):
        return self.uuid
    
