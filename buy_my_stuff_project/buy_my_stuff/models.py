from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
# Create your models here.

class Customer(AbstractUser, PermissionsMixin):
  first_name = models.CharField(max_length=100)
  email = models.EmailField(unique=True)
  username = None
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []

  def __str__(self):
    return self.email