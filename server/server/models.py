from django.db import models

class Grade(models.Model):
    grade = models.IntegerField(unique=True)
    detail = models.CharField(max_length=255, default='default')

    def __str__(self):
        return str(self.grade)

class Branch(models.Model):
    name = models.CharField(max_length=255)
    grades = models.ForeignKey(Grade, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class User(models.Model):
    username = models.CharField(max_length=255, default='default')
    email = models.EmailField(max_length=255, default='default')
    password = models.CharField(max_length=255, default='default')
    mybranch = models.ForeignKey(Branch, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.username

class AllBranch(models.Model):
    branche = models.ForeignKey(Branch, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.branche)
