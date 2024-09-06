from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Grade, AllBranch


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']


class GradeSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Grade
        fields = ['id', 'grade', 'detail', 'branch', 'user']

class GradeWithoutUserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Grade
        fields = ['id', 'grade', 'detail', 'branch']

class BranchSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = AllBranch
        fields = ['id', 'name', 'average']
