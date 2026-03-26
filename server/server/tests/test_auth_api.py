from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase


class AuthenticationApiTests(APITestCase):
    def test_signup_creates_user_and_returns_token(self):
        payload = {
            "username": "alice",
            "password": "StrongPass123",
            "email": "alice@example.com",
        }

        response = self.client.post("/users/signup/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["user"]["username"], payload["username"])

        user = User.objects.get(username=payload["username"])
        self.assertTrue(user.check_password(payload["password"]))

    def test_login_returns_token_for_valid_credentials(self):
        user = User.objects.create_user(
            username="bob",
            email="bob@example.com",
            password="SafePass123",
        )

        payload = {
            "username": user.username,
            "password": "SafePass123",
        }

        response = self.client.post("/users/login/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["user"]["id"], user.id)

    def test_login_fails_with_invalid_password(self):
        User.objects.create_user(
            username="chris",
            email="chris@example.com",
            password="ValidPass123",
        )

        payload = {
            "username": "chris",
            "password": "WrongPassword",
        }

        response = self.client.post("/users/login/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["detail"], "Not found.")
