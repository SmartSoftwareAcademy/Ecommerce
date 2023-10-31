from django.http import JsonResponse
from django.shortcuts import render
from datetime import date, datetime
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from pos.models import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, authentication
from rest_framework.decorators import action
from django.db.models import Q
from .serializers import *
# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.filter(status=1).select_related(
        'vendor').prefetch_related('images')
    serializer_class = ProductsSerializer
    permission_classes = [permissions.AllowAny,]

    def get_queryset(self):
        queryset = super().get_queryset()
        search_item = self.request.query_params.get('filter', None)
        vendor = None
        user = self.request.user
        try:
            vendor = Vendor.objects.filter(user=user).first()
        except Exception as e:
            print(e)
        print(vendor)
        if search_item != None and not user.is_authenticated:
            queryset = queryset.filter(Q(maincategory__name__icontains=search_item) | Q(categories__name__icontains=search_item) | Q(
                subcategories__name__icontains=search_item))
        if user.is_authenticated:
            if vendor != None and search_item != None:
                queryset = queryset.filter(Q(maincategory__name__icontains=search_item) | Q(categories__name__icontains=search_item) | Q(
                    subcategories__name__icontains=search_item) & Q(vendor=vendor))
            else:
                queryset = queryset.filter(vendor=vendor)
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        related_products = self.get_related_products(instance)
        serializer = self.get_serializer(instance)
        related_serializer = self.get_serializer(related_products, many=True)
        data = {
            "product": serializer.data,
            "related_products": related_serializer.data,
        }
        return Response(data)

    def get_related_products(self, product):
        """
        Returns a queryset of related products based on their titles, descriptions,
        categories, and subcategories using Q objects.
        """
        related_products = Products.objects.filter(
             Q(title__icontains=product.title)
            | Q(description__icontains=product.description)
            | Q(categories__in=product.categories.all())
            | Q(subcategories__in=product.subcategories.all())
        ).exclude(id=product.id).distinct()[:5]
        return related_products

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ReviewsViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewsSerializer
    permission_classes = [permissions.AllowAny,]

    def get_queryset(self):
        queryset = super().get_queryset()
        # Apply filters based on query parameters
        sku = self.request.query_params.get('sku', None)
        if sku is not None:
            queryset = queryset.filter(product__sku=sku)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class FavouritesViewSet(viewsets.ModelViewSet):
    queryset = Favourites.objects.all()
    serializer_class = FavouritesSerializer
    permission_classes = [permissions.AllowAny,]

    def get_queryset(self):
        queryset = super().get_queryset()
        # Apply filters based on query parameters
        # sku = self.request.query_params.get('sku', None)
        # if sku is not None:
        #     queryset = queryset.filter(product__sku=sku)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class Home(APIView):
    permission_classes = ([permissions.AllowAny,])
    authentication_classes = ()

    def get(self, request, *args, **kwargs):
        now = datetime.now()
        current_year = now.year
        current_month = now.month
        current_day = now.day
        categories = len(Category.objects.all())
        subcategories = len(Subcategory.objects.all())
        products = len(Products.objects.all())
        transaction = len(Sales.objects.filter(
            date_added__year=current_year,
            date_added__month=current_month,
            date_added__day=current_day
        ))
        today_sales = Sales.objects.filter(
            date_added__year=current_year,
            date_added__month=current_month,
            date_added__day=current_day
        ).all()
        total_sales = sum(today_sales.values_list('grand_total', flat=True))
        context = {
            'categories': categories,
            'subcategories': subcategories,
            'products': products,
            'transaction': transaction,
            'total_sales': total_sales,
        }
        return Response(context)
