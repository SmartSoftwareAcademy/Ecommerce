from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from django.shortcuts import render
from datetime import date, datetime
from .models import Products,StockInventory
from vendor.models import Vendor
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, authentication
from .serializers import *
from django.db.models import Q,Sum
from django.db.models import F, ExpressionWrapper, DecimalField

# Create your views here.


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = StockInventory.objects.all()
    serializer_class = StockSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get_queryset(self):
        queryset = super().get_queryset()
        prod_id= self.request.query_params.get('prod_id',None)
        vendor = None
        user = self.request.user
        try:
            vendor = Vendor.objects.filter(user=user).first()
        except Exception as e:
            print(e)
        if user.is_authenticated:
            if vendor != None:
                queryset = queryset.filter(product__vendor=vendor)
        if prod_id:
            # Filter the queryset by the specified product ID
            product=Products.objects.filter(id=prod_id).first()
            queryset = queryset.filter(product=product)
        a=queryset.first()
        a.adjusted_price
        return queryset
