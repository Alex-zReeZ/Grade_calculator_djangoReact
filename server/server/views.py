from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .models import Grade, AllBranch, BranchGrade
from .permissions import IsOwner, IsAuthenticated
from .serializers import UserSerializer, GradeSerializer, BranchSerializer, GradeWithoutUserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        return self.queryset.filter(id=self.request.user.id)

    @action(detail=False, methods=['post'])
    def login(self, request):
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(instance=user)
        return Response({"token": token.key, "user": serializer.data})

    @action(detail=False, methods=['post'])
    def signup(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({"token": token.key, "user": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def my_grades(self, request):
        user = request.user
        grades = Grade.objects.filter(user=user)
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)


    @action(detail=True, methods=['get'])
    def get_grades_by_branch(self, request, pk=None):
        try:
            branch = AllBranch.objects.get(name=pk)
        except AllBranch.DoesNotExist:
            return Response({'error': 'Branch not found'}, status=status.HTTP_404_NOT_FOUND)

        grades = Grade.objects.filter(branch__branch=branch, user=request.user)
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)

class BranchViewSet(viewsets.ModelViewSet):
    queryset = AllBranch.objects.all()
    serializer_class = BranchSerializer

class GradeViewSetWithoutUser(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeWithoutUserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def add_grade(self, request, pk=None):
        all_branch = get_object_or_404(AllBranch, name=pk)
        branch_grade, created = BranchGrade.objects.get_or_create(branch=all_branch)
        serializer = GradeWithoutUserSerializer(data=request.data)

        if serializer.is_valid():
            grade = serializer.save(user=request.user)
            grade.branch = branch_grade
            grade.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
