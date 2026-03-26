from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from server.models import AllBranch, BranchGrade, Grade


class GradeApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="eva",
            email="eva@example.com",
            password="SafePass123",
        )
        self.other_user = User.objects.create_user(
            username="frank",
            email="frank@example.com",
            password="SafePass123",
        )

    def test_my_grades_requires_authentication(self):
        response = self.client.get("/grades/my_grades/")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_my_grades_returns_only_current_user_grades(self):
        Grade.objects.create(grade=5.5, detail="Maths", user=self.user)
        Grade.objects.create(grade=3.0, detail="Science", user=self.other_user)

        self.client.force_authenticate(user=self.user)
        response = self.client.get("/grades/my_grades/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["user"], self.user.id)
        self.assertEqual(response.data[0]["detail"], "Maths")

    def test_add_grade_creates_grade_in_branch_for_authenticated_user(self):
        branch = AllBranch.objects.create(name="Maths", average=0)
        branch_grade = BranchGrade.objects.create(branch=branch)

        self.client.force_authenticate(user=self.user)
        payload = {
            "grade": 4.5,
            "detail": "Test note",
        }

        response = self.client.post("/newGrade/Maths/add_grade/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Grade.objects.count(), 1)

        grade = Grade.objects.first()
        self.assertEqual(grade.user, self.user)
        self.assertEqual(grade.branch, branch_grade)
        self.assertEqual(grade.detail, payload["detail"])
