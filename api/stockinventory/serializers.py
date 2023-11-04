
from rest_framework import serializers
from .models import *
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from product.serializers import ProductsSerializer

class productSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ('id','size','unit','unit_price','unit_discount_price')
        depth=1

class productColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = ('id','color')


class StockSerializer(serializers.ModelSerializer):
    size=productSizeSerializer()
    color=productColorSerializer()
    product=ProductsSerializer()
    class Meta:
        model = StockInventory
        fields = '__all__'
        depth=1
