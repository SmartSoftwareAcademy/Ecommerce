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
    permission_classes =()

    def get_queryset(self):
        queryset = super().get_queryset()
        prod_id = self.request.query_params.get('prod_id', None)
        search_item = self.request.query_params.get('filter', None)
        vendor = None
        user = self.request.user
        try:
            vendor = Vendor.objects.filter(user=user).first()
        except Exception as e:
            print(e)
        if search_item and not user.is_authenticated:
            queryset = queryset.filter(Q(product__maincategory__name__icontains=search_item) | Q(product__maincategory__categories__name__icontains=search_item)).distinct()
        if user.is_authenticated:
            # Create a Q object to filter products by maincategory and categories
            if search_item:
                maincategory_filter = Q(product__maincategory__name__icontains=search_item)
                categories_filter = Q(product__maincategory__categories__name__icontains=search_item)

                if vendor:
                    # Combine the maincategory and categories filters with the vendor filter
                    queryset = queryset.filter((maincategory_filter | categories_filter) & Q(product__vendor=vendor)).distinct()
                else:
                    # If no vendor is specified, apply the maincategory and categories filters
                    queryset = queryset.filter(maincategory_filter | categories_filter).distinct()

            if prod_id:
                # Filter the queryset by the specified product ID
                product = Products.objects.filter(id=prod_id).first()
                queryset = queryset.filter(product=product).distinct()
        return queryset
