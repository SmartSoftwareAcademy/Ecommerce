from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
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
from .serializers import *
from human_resource.models import Supplier
from stockinventory.models import StockInventory
from stockinventory.serializers import *

# add product


@api_view(['POST', 'PUT'])
@permission_classes([permissions.IsAuthenticated,])
def addProduct(request, id=0):
    #try:
        sku = request.POST.get('sku')
        model = request.POST.get('model')
        title = request.POST.get('title')
        description = request.POST.get('description')
        price = request.POST.get('price')
        discount_price = request.POST.get('discount_price')
        status = request.POST.get('status')
        weight = request.POST.get('weight')
        dimentions = request.POST.get('dimensions')
        material = request.POST.get('material')
        color = request.POST.get('color')
        size = request.POST.get('size')
        availability = request.POST.get('availability')
        maincategory = MainCategory.objects.get(
            id=request.POST.get('maincategories'))
        category = Category.objects.filter(
            name__in=request.POST.get('categories'))
        subcategories = Subcategory.objects.filter(
            name__in=request.POST.get('subcategories'))
        vendor = Vendor.objects.get(
            user__id__in=request.POST.get('vendor'))
        productimages = request.FILES.getlist('images')
        stock_level = request.POST.get('stock_level')
        reorder_level = request.POST.get('reorder_level')
        supplier = Supplier.objects.get(
            id__in=request.POST.get('supplier'))
        if id == 0:
            # add product
            product = Products(
                sku=sku,
                model=model,
                title=title,
                description=description,
                price=price,
                discount_price=discount_price,
                status=status,
                weight=weight,
                dimentions=dimentions,
                availability=availability
            )
            product.vendor = vendor
            product.save()
            # add inventory
            stock = StockInventory(product=product, stock_level=stock_level,
                                   reorder_level=reorder_level, supplier=supplier)
            stock.save()
            subcats = []
            maincat = None
            if maincategory:
                maincat = MainCategory.objects.get(id=maincategory.pk)
                product.maincategory = maincat
            if category:
                cats = Category.objects.filter(name__in=category)
                for cat in cats:
                    product.categories.add(cat)
                    maincat.categories.add(cat)
                    if subcategories:
                        subcats = Category.objects.filter(
                            name__in=subcategories)
                        for sbc in subcats:
                            product.subcategories.add(sbc)
                            cat.Subcategories.add(sbc)
            # add variations
            if material:
                material, created = Variations.objects.get_or_create(
                    title='material', description=material, count=stock_level)
                product.variations.add(material)
            if color:
                for cl in str(color).split(','):
                    c, created = Variations.objects.get_or_create(
                        title='color', description=cl, count=stock_level)
                    product.variations.add(c)
            if size:
                for s in str(size).split(','):
                    sz, created = Variations.objects.get_or_create(
                        title='color', description=s, count=stock_level)
                    product.variations.add(sz)
            if productimages:
                for img in productimages:
                    product.images.create(image=img)
            product.save()
        else:
            # upate product
            product_instance = Products.objects.get(id=id)
            product_instance.sku = sku
            product_instance.title = title
            product_instance.description = description
            product_instance.weight = weight
            product_instance.dimentions = dimentions
            product_instance.model = model
            product_instance.status = 1
            product_instance.availability = availability
            product_instance.price = price
            product_instance.discount_price = discount_price
            product_instance.vendor = vendor
            # update inventory
            stock = StockInventory.objects.get(product=product_instance)
            stock.stock_level = stock_level
            stock.reorder_level = reorder_level
            stock.supplier = supplier
            stock.save()
            product_instance.maincategory = maincategory
            for cat in category:
                product_instance.categories.set(cat)
                maincategory.categories.set(cat)
                subcats = Category.objects.filter(
                    name__in=subcategories)
                for sbc in subcats:
                    product_instance.subcategories.set(sbc)
                    cat.Subcategories.set(sbc)
            # update variations
            if material:
                material, created = Variations.objects.update_or_create(
                    title='material', description=material, count=stock_level)
                product_instance.variations.set([material])
            if color:
                for cl in str(color).split(','):
                    c, created = Variations.objects.update_or_create(
                        title='color', description=cl, count=stock_level)
                    product_instance.variations.set([c])
            if size:
                for s in str(size).split(','):
                    sz, created = Variations.objects.update_or_create(
                        title='color', description=s, count=stock_level)
                    product_instance.variations.set([sz])
            if productimages:
                for img in productimages:
                    p, updated = product_instance.images.update_or_create(
                        image=img)
            product_instance.save()
            print(product_instance)
        return Response({'msg': 'Your work has been  saved!', 'status': 'success!', 'icon': 'success'})
    # except Exception as e:
    #     return Response({'msg': str(e), 'status': 'Failed!', 'icon': 'error'})

# Create your views here.


class MainCategoryViewSet(viewsets.ModelViewSet):
    queryset = MainCategory.objects.all()
    serializer_class = MainCategoriesSerializer
    permission_classes = [permissions.AllowAny]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoriesSerializer
    permission_classes = [permissions.AllowAny]


class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubCategoriesSerializer
    permission_classes = [permissions.AllowAny]


class ProductColorViewSet(viewsets.ModelViewSet):
    queryset = ProductColor.objects.all()
    serializer_class = productColorSerializer
    permission_classes = [permissions.AllowAny]

class ProductSizeViewSet(viewsets.ModelViewSet):
    queryset = ProductSize.objects.all()
    serializer_class = productSizeSerializer
    permission_classes = [permissions.AllowAny]