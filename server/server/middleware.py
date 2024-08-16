from django.shortcuts import redirect
from django.urls import reverse

class TokenRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        allowed_ulrs = [reverse('login'), reverse('signup')]

        token = request.COOKIES.get('token')
        if not token:
            if request.path not in allowed_ulrs:
                return redirect('login')

        response = self.get_response(request)
        return response
