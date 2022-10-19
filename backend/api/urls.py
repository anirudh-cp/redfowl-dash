from django.urls import path

from .Views.Auth import *
from .Views.Users import *


urlpatterns = [
    path('user/login', ObtainAuthTokenView.as_view()),
    path('user/register', registration_view), 
      
    path('user/<uid>', UserActions.as_view()),
    path('user', UserAll.as_view()),
    
]

