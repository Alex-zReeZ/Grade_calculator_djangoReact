from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserViewSet, GradeViewSet, BranchViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'grades', GradeViewSet, basename='grade')
router.register(r'branches', BranchViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
