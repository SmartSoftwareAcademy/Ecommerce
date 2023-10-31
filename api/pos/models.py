from django.db import models
from django.utils import timezone
from product.models import *
from human_resource.models import *


class Unit(models.Model):
    unit_title = models.CharField(max_length=50)
    unit_symbol = models.CharField(max_length=5)

    def __str__(self):
        return self.unit_symbol

    class Meta:
        db_table = "units"
        managed = True
        verbose_name_plural = "Units"


class SpecialOffers(models.Model):
    offer_title = models.CharField(max_length=200)
    label = models.CharField(max_length=50, choices=(
        ("New", "New"), ("Hot", "Hot"), ("Premium", "Premium"), ("Sponsored", "Sponsored")), default="Hot")
    offer_from_date = models.DateField()
    offer_to_date = models.DateField()
    products = models.ManyToManyField(Products)

    def __str__(self):
        return self.offer_title

    class Meta:
        db_table = 'special_offers'
        managed = True
        verbose_name = 'Special Offer'
        verbose_name_plural = 'Special Offers'


class Sales(models.Model):
    attendant = models.ForeignKey(
        Employee, on_delete=models.DO_NOTHING, related_name="sales", blank=True, null=True)
    code = models.CharField(max_length=100, blank=True, null=True)
    sub_total = models.FloatField(default=0)
    grand_total = models.FloatField(default=0)
    tax_amount = models.FloatField(default=0)
    tax = models.FloatField(default=0)
    tendered_amount = models.FloatField(default=0)
    amount_change = models.FloatField(default=0)
    date_added = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=20, default="pending", blank=True, null=True)
    paymethod = models.CharField(
        max_length=20, default="cash", blank=True, null=True)
    sales_type = models.CharField(
        max_length=20, default="walk-in customer")

    def __str__(self):
        return self.code

    class Meta:
        db_table = 'sales'
        managed = True
        verbose_name = 'Sales'
        verbose_name_plural = 'Sales'


class salesItems(models.Model):
    sale = models.ForeignKey(
        Sales, on_delete=models.CASCADE, related_name='salesitems')
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, related_name='salesitems')
    price = models.FloatField(default=0)
    qty = models.FloatField(default=0)
    total = models.FloatField(default=0)
    date_added = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product.title

    class Meta:
        db_table = 'salesitems'
        managed = True
        verbose_name = 'Sales Items'
        verbose_name_plural = 'Sales Items'
