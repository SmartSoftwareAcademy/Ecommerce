from collections.abc import Iterable
from django.db import models
from product.models import Products,ProductSize,ProductColor
from human_resource.models import Supplier
# Create your models here.


class StockInventory(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    stock_level = models.PositiveIntegerField(default=1)
    reorder_level = models.PositiveIntegerField(default=5)
    size = models.ForeignKey(ProductSize, on_delete=models.CASCADE, blank=True, null=True)
    color = models.ForeignKey(ProductColor, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.product} ({self.stock_level})"

    class Meta:
        db_table = 'inventory'
        verbose_name = 'Stock Inventory'
        verbose_name_plural = 'Stock Inventory'
