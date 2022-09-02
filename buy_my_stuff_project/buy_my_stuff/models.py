from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Customer(AbstractUser):
  first_name = models.CharField(max_length=100)
  email = models.EmailField(unique=True)
  username = models.CharField(max_length=100, require=False)
  USERNAME_FIELD = 'email'
  EMAIL_FIELD = 'email'

  def __str__(self):
    return self.name