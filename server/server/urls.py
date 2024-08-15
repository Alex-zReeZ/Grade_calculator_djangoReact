from django.urls import re_path
from .views import signup, login, allusers

urlpatterns = [
    re_path('signup', signup),
    re_path('login', login),
    re_path('users/', allusers),
]