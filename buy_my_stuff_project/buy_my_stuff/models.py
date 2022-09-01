from django.db import models

class Category(models.Model):
  name = models.CharField(max_length=100, default='category name')
  description = models.TextField(default='category description')

  def __str__(self):
    return self.name

class Item(models.Model):
  category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')
  name = models.CharField(max_length=100, default='item name')
  description = models.TextField(default='item description')
  image = models.ImageField(default=None)
  price = models.FloatField(default=0)