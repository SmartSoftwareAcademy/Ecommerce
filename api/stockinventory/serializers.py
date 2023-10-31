
from rest_framework import serializers
from .models import *
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import get_user_model


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockInventory
        fields = '__all__'
        depth = 1
