from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserViewSet, GradeViewSet, BranchViewSet, GradeViewSetWithoutUser

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'grades', GradeViewSet, basename='grade')
router.register(r'branches', BranchViewSet)
router.register(r'newGrade', GradeViewSetWithoutUser, basename='newGrade')

urlpatterns = [
    path('', include(router.urls)),
]
