from rest_framework import serializers
from .models import *
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from human_resource.serializers import CustomerSerializer


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(required=False)

    class Meta:
        model = Order
        fields = '__all__'
        depth = 1


class OrderItemSerializer(serializers.ModelSerializer):
    order = OrderSerializer(required=False)

    class Meta:
        model = OrderItem
        fields = '__all__'
        depth = 1


class InvoicesSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(required=False)

    class Meta:
        model = Invoice
        fields = '__all__'
        depth = 1


