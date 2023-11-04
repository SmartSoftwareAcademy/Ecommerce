from django.db import models
from django.utils import timezone
from product.models import *
from human_resource.models import *


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
    sku=models.CharField(max_length=100,default="103")
    price = models.FloatField(default=0)
    qty = models.FloatField(default=0)
    total = models.FloatField(default=0)
    date_added = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sale.code+"-"+self.sku

    class Meta:
        db_table = 'salesitems'
        managed = True
        verbose_name = 'Sales Items'
        verbose_name_plural = 'Sales Items'
