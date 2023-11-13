from django.contrib import admin
from .models import *
from django import forms

# Register your models here.
admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(ProductImages)
admin.site.register([MainCategory, Favourites,ProductSize,ProductColor,Unit])

class ProductColorInline(admin.TabularInline):
    model=ProductColor
    extra=1

class ProductSizeInline(admin.TabularInline):
    model=ProductSize
    extra=1

class ProductImagesInline(admin.TabularInline):
    model=ProductImages
    extra=1

class ProductsAdmin(admin.ModelAdmin):
    inlines = [ProductImagesInline,ProductColorInline,ProductSizeInline,]
    list_display = ['title','status', 'vendor', 'model',]
    list_filter = ['title','status', 'vendor', 'model',]

    fieldsets = (
        ('Product Information', {
            'fields': ('maincategory', 'vendor', 'model', 'title', 'description', 'retail_price', 'discount_price', 'status', 'date_added', 'weight', 'dimentions')
        }),
        )
admin.site.register(Products,ProductsAdmin)