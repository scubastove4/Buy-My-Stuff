from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/buy_my_stuff/login/',
    '/buy_my_stuff/register/',
    '/buy_my_stuff/token/refresh/'
  ]
  return Response(routes)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
  if request.method == 'GET':
    data = f"Congrats, {request.user}! The GET req worked!"
    return Response({'response': data}, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    text = request.POST.get('text')
    data = f"Congrats, {request.user}! The POST req worked!"
    return Response({'response': data}, status=status.HTTP_200_OK)
  return Response({}, status.HTTP_400_BAD_Request)