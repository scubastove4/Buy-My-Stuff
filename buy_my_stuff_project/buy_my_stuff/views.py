from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from .models import Customer
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from .forms import CustomerCreationForm
# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
  queryset = Customer.objects.all()
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/buy_my_stuff/login/',
    '/buy_my_stuff/register/',
    '/buy_my_stuff/token/refresh/'
    'buy_my_stuff/'
    'buy_my_stuff/category/<int:pk>'
  ]
  return Response(routes)

@api_view(['GET'])
@permission_classes([AllowAny])
def categories(request):
  if request.method == 'GET':
    data = f"Congrats, {request.user}! The GET req worked!"
    return Response({'response': data}, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    text = request.POST.get('text')
    data = f"Congrats, {request.user}! The POST req worked!"
    return Response({'response': data}, status=status.HTTP_200_OK)
  return Response({}, status.HTTP_400_BAD_Request)

@api_view(['POST'])
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