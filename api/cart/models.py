from django.db import models
from product.models import Products
from human_resource.models import Customer
# Create your models here.


class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, null=True)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return "{} [{}]".format(self.product.title, self.quantity)

    def get_cart_total(self):
        return (self.product.discount_price*self.quantity if self.product.discount_price > 0 else self.product.price*self.quantity)

    class Meta:
        db_table = 'cart'
        managed = True
        verbose_name = 'Cart'
        verbose_name_plural = 'cart'
