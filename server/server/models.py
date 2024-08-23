from django.db import models
from django.contrib.auth.models import User

class Grade(models.Model):
    grade = models.IntegerField(unique=True)
    detail = models.CharField(max_length=255, default='default')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.grade)

class AllBranch(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)

class Branch(models.Model):
    name = models.CharField(max_length=255)
    grades = models.ForeignKey(Grade, on_delete=models.CASCADE)
    branch = models.ForeignKey(AllBranch, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class GradeUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user
