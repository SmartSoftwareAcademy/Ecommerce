from datetime import datetime
from unicodedata import category
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from vendor.models import Vendor

User = get_user_model()
# Create your models here.


class MainCategory(models.Model):
    categories = models.ManyToManyField(
        "Category", null=True, blank=True)
    name = models.TextField()
    display_image = models.ImageField(
        upload_to='maincategory/display', null=True, blank=True)
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "main_categories"
        managed = True
        verbose_name_plural = "Main Categories"


class Category(models.Model):
    Subcategories = models.ManyToManyField(
        "Subcategory", null=True, blank=True)
    name = models.TextField()
    display_image = models.ImageField(
        upload_to='category/display', null=True, blank=True)
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "categories"
        managed = True
        verbose_name_plural = "Categories"


class Subcategory(models.Model):
    name = models.CharField(max_length=200)
    display_image = models.ImageField(
        upload_to='category/subcategory/display', null=True, blank=True)
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "subcategories"
        managed = True
        verbose_name_plural = "Sub Categories"

class Unit(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class ProductImages(models.Model):
    product=models.ForeignKey("Products",on_delete=models.SET_NULL,related_name='images',null=True,blank=True)
    image = models.FileField(upload_to="products/%Y%m%d/")

    def __str__(self):
        return self.image.url if self.image else None

    class Meta:
        db_table = "productimages"
        managed = True
        verbose_name_plural = "Images"


class Review(models.Model):
    product = models.ForeignKey(
        "Products", on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.SET_NULL,related_name='images',null=True,blank=True)
    text = models.TextField()
    rating = models.PositiveIntegerField(
        default=0, choices=((5, 5), (4, 4), (3, 3), (2, 2), (1, 1)))
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)

    class Meta:
        db_table = "reviews"
        managed = True
        verbose_name_plural = "Reviews"


class Products(models.Model):
    maincategory = models.ForeignKey(
        MainCategory, on_delete=models.CASCADE, null=True, blank=True)
    vendor = models.ForeignKey(
        Vendor, on_delete=models.CASCADE, related_name="products", null=True, blank=True)
    model = models.CharField(max_length=255, blank=True, null=True)
    sku = models.CharField(max_length=100)
    serial = models.CharField(max_length=255, default='0671860013525')
    title = models.TextField(max_length=500, default="Hp x2 1033")
    description = models.TextField()
    price = models.FloatField(default=0,help_text='Enter general price or leave it as 0.0 and set unit price in variations')
    discount_price = models.FloatField(default=0, null=True, blank=True,help_text='Enter general discount price or leave it as 0.0 and set unit price in variations')
    status = models.IntegerField(default=1)
    date_added = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)
    weight = models.CharField(max_length=255, blank=True, null=True)
    dimentions = models.CharField(
        max_length=50, default="1x2x3", blank=True, null=True)
    availability = models.CharField(max_length=20,choices=(("In Stock","In Stock"),("Out of Stock","Out of Stock"),("Re-Order","Re-Order")),default="In Stock")
    usage = models.CharField(max_length=20,choices=(("EX-UK","EX-UK"),("Refurbished","Refurbished"),("New","New")),default="New",blank=True,null=True,help_text='Leave blank if not applicable')
    is_new_arrival = models.BooleanField(default=False)
    is_flash_sale = models.BooleanField(default=False)
    is_deal_of_the_day = models.BooleanField(default=False)
    is_top_pick= models.BooleanField(default=False)

    def __str__(self):
        return self.sku + " - " + self.title

    class Meta:
        db_table = 'products'
        managed = True
        verbose_name = 'Products'
        verbose_name_plural = 'Products'

    def product_total(self):
        return self

class ProductSize(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    size = models.PositiveIntegerField(max_length=10)
    unit=models.ForeignKey(Unit,on_delete=models.SET_NULL,related_name='sizes',null=True)
    unit_price=models.FloatField(max_length=100,default=0)
    unit_dicount_price=models.FloatField(max_length=100,default=0,null=True,blank=True)

    class Meta:
        verbose_name='Size Variation'
        verbose_name_plural='Size Variation'

    def __str__(self):
        return str(self.size) + " " + str(self.unit.name)

class ProductColor(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE,related_name='colors',null=True,blank=True)
    color = models.CharField(max_length=20)

    class Meta:
        verbose_name='Color Variation'
        verbose_name_plural='Color Variation'

    def __str__(self):
        return self.color


class Favourites(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, related_name='favourites')
    is_favorite=models.BooleanField(default=False)

    def __str__(self):
        return self.product.title

    class Meta:
        db_table = 'savedproducts'
        managed = True
        verbose_name = 'Favourites'
        verbose_name_plural = 'Favourites'
