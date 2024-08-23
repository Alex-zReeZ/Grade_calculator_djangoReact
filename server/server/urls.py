from django.urls import path
from .views import signup, login, allusers, add_grade, get_branch_grades, add_branch

urlpatterns = [
    path('signup', signup),
    path('login', login),
    path('users/', allusers),
    path('grades/<str:branch_name>', add_grade),
    path('branchGrade/<str:branch_name>', get_branch_grades),
    path('addbranch', add_branch)
]