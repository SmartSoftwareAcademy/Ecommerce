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
    supplier = models.ForeignKey(Supplier,on_delete=models.CASCADE, blank=True, null=True)
    adjusted_price=models.DecimalField(max_digits=10, decimal_places=2,default=0.0,blank=True,null=True)
    adjusted_dicount_price=models.DecimalField(max_digits=10, decimal_places=2,default=0.0,blank=True,null=True)

    def __str__(self):
        return f"{self.product} ({self.stock_level})"


    def save(self,*args,**kwargs):
        base_price = self.product.price
        discount_base_price=self.product.discount_price
        size_multiplier = self.size.size if self.size else 1
        # You can add similar logic for color or other variations here
        new_price = base_price * size_multiplier
        new_discount_price = discount_base_price * size_multiplier
        self.adjusted_price = new_price
        self.adjusted_dicount_price=new_discount_price
        print(self.adjusted_price,self.adjusted_dicount_price)
        super(StockInventory, self).save(*args, **kwargs)

    class Meta:
        db_table = 'inventory'
        verbose_name = 'Stock Inventory'
        verbose_name_plural = 'Stock Inventory'
