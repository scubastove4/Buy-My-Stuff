from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomerCreationForm, CustomerChangeForm
from .models import Customer
# Register your models here.
class CustomerAdmin(UserAdmin):
    add_form = CustomerCreationForm
    add_fieldsets = (
      (None, {'fields': ('first_name', 'email', 'password1', 'password2')}),
    )
    form = CustomerChangeForm
    fieldsets = (
      (None, {'fields': ('first_name', 'email', 'password1', 'password2')}),
    )
    model = Customer
    list_display = ['first_name', "email",]
    ordering = ('first_name',)

admin.site.register(Customer, CustomerAdmin)