from collections.abc import Iterable
from django.db import models
from product.models import Products,ProductSize,ProductColor
from human_resource.models import Supplier
from django.contrib.auth import get_user_model
from datetime import datetime
# Create your models here.
User=get_user_model()

class StockInventory(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE,related_name="stock")
    stock_level = models.PositiveIntegerField(default=1)
    reorder_level = models.PositiveIntegerField(default=5)
    size = models.ForeignKey(ProductSize, on_delete=models.CASCADE, blank=True, null=True)
    color = models.ForeignKey(ProductColor, on_delete=models.CASCADE, blank=True, null=True)
    usage = models.CharField(max_length=20,choices=(("EX-UK","EX-UK"),("Refurbished","Refurbished"),("Used Like New","Used Like New"),("Secod Hand","Second Hand"),("New","New")),default="New",blank=True,null=True,help_text='Leave blank if not applicable')
    sku=models.CharField(max_length=100,default='1',unique=True)
    serial=models.CharField(max_length=100,default='12263644',unique=True)
    supplier=models.ForeignKey(Supplier,on_delete=models.CASCADE,related_name='stock',null=True,blank=True)
    availability = models.CharField(max_length=20,choices=(("In Stock","In Stock"),("Out of Stock","Out of Stock"),("Re-Order","Re-Order")),default="In Stock")
    is_new_arrival = models.BooleanField(default=False)
    is_favorite=models.BooleanField(default=False)
    is_flash_sale = models.BooleanField(default=False)
    slider_image=models.FileField(upload_to='store/slider',blank=True,null=True)
    is_deal_of_the_day = models.BooleanField(default=False)
    is_top_pick= models.BooleanField(default=False)

    def __str__(self):
        return f"{self.product} ({self.stock_level})"

    class Meta:
        db_table = 'inventory'
        verbose_name = 'Stock Inventory'
        verbose_name_plural = 'Stock Inventory'

class FrontStore(models.Model):
    flash_sale_end_date=models.DateTimeField(default=datetime.now())
    slider_products=models.ManyToManyField(StockInventory,blank=True,null=True)
    slider_text = models.CharField(max_length=100, default="Upto 60% + Extra 10%")

    def __str__(self):
        return "Front Store Settings"

    class Meta:
        db_table = 'storefront'
        verbose_name = 'Front Store Settings'
        verbose_name_plural = 'Front Store Settings'

class Review(models.Model):
    stock = models.ForeignKey(
        StockInventory, on_delete=models.CASCADE, related_name='reviews')
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

