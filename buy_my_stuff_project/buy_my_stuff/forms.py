from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Customer

class CustomerCreationForm(UserCreationForm):
  email = forms.EmailField(label=('Email'), required=True)
  first_name = forms.CharField(max_length=100)
  password1 = forms.CharField(label=('Password'), widget=forms.PasswordInput)
  password2 = forms.CharField(label=('Password Confrimation'), widget=forms.PasswordInput)
  
  class Meta:
    model = Customer
    fields = ('first_name', 'email')

class CustomerChangeForm(UserChangeForm):
  class Meta:
    model = Customer
    fields = ('first_name', 'email')