from .models import Customer
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    # Add custom claims
    # token['username'] = user.username
    token['user_id'] = user.id
    token['email'] = user.email
    token['first_name'] = user.first_name
    # ...
    return token

class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = Customer
    fields = ('first_name', 'email', 'password', 'password2')

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})

    return attrs

  def create(self, validated_data):
    user = Customer.objects.create(
      email=validated_data['email']
    )

    user.set_password(validated_data['password'])
    user.save()

    return user
