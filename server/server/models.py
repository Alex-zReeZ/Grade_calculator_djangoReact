from django.db import models
from django.contrib.auth.models import User

class AllBranch(models.Model):
    name = models.CharField(max_length=255)
    average = models.FloatField(default=0)

    def __str__(self):
        return str(self.name)

class BranchGrade(models.Model):
    branch = models.ForeignKey(AllBranch, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.branch)

class Grade(models.Model):
    grade = models.FloatField(unique=False)
    detail = models.CharField(max_length=255, default='default')
    branch = models.ForeignKey(BranchGrade, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.grade)

class GradeUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    branches = models.ManyToManyField(AllBranch)

    def __str__(self):
        return str(self.user)
