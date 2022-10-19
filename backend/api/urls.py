from django.urls import path

from backend.api.Views.MOM import MOM, MOMAll

from .Views.Auth import *
from .Views.Users import *


urlpatterns = [
    path('user/login', ObtainAuthTokenView.as_view()),
    path('user/register', registration_view), 
      
    path('user/<uuid>', UserActions.as_view()),
    path('user', UserAll.as_view()),
    path('user/simple', UserSimple.as_view()),
    
    path('mom/<uuid>', MOM.as_view()),
    path('mom', MOMAll.as_view()),
]

