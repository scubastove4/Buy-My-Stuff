from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomerCreationForm, CustomerChangeForm
from .models import Customer
# Register your models here.
class CustomerAdmin(UserAdmin):
    add_form = CustomerCreationForm
    form = CustomerChangeForm
    model = Customer
    list_display = ['first_name', "email",]
    ordering =('first_name', 'email')

admin.site.register(Customer, CustomerAdmin)