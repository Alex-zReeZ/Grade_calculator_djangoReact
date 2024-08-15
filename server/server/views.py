from rest_framework.decorators import api_views
from rest_framework.response import Response

@api_views(['POST'])
def login(request):
    return Response({})

@api_views(['POST'])
def signup(request):
    return Response({})


