from django.urls import path
from .views import signup, login, allusers, add_grade, add_branch, get_grades_by_branch

urlpatterns = [
    path('signup', signup),
    path('login', login),
    path('users/', allusers),
    path('addbranch', add_branch),
    path('grades/<str:branch_name>', add_grade),
    path('grades/<str:branch_name>/list', get_grades_by_branch),
]