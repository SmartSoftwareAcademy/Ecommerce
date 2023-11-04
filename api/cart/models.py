from django.db import models
from product.models import Products
from authmanagement.models import MyUser
from product.models import ProductSize, ProductColor
# Create your models here.


class Cart(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE,related_name='cart')
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, null=True)
    size=models.ForeignKey(ProductSize,on_delete=models.CASCADE,related_name='cart',blank=True,null=True),
    color=models.ForeignKey(ProductColor,on_delete=models.CASCADE,related_name='cart',blank=True,null=True),
    quantity = models.PositiveIntegerField(default=0)
    item_subtotal=models.FloatField(default=0)
    tax=models.FloatField(default=0)
    item_total=models.FloatField(default=0)

    def __str__(self) -> str:
        return "{} [{}]".format(self.product.title, self.quantity)

    class Meta:
        db_table = 'cart'
        managed = True
        verbose_name = 'Cart'
        verbose_name_plural = 'cart'
