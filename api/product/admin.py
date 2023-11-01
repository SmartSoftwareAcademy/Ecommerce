from django.contrib import admin
from .models import *
from django import forms

# Register your models here.
admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(ProductImages)
admin.site.register([Review, MainCategory, Favourites,ProductSize,ProductColor,Unit])

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
    list_display = ['title', 'availability', 'usage','is_new_arrival', 'is_flash_sale', 'is_deal_of_the_day', 'is_top_pick']
    list_filter = ['availability','usage', 'is_new_arrival', 'is_flash_sale', 'is_deal_of_the_day', 'is_top_pick']

    fieldsets = (
        ('Product Information', {
            'fields': ('maincategory', 'vendor', 'model', 'sku', 'serial', 'title', 'description', 'price', 'discount_price', 'status', 'date_added', 'weight', 'dimentions')
        }),
        ('Classifications',{
            'fields': ('usage','availability', 'is_new_arrival', 'is_flash_sale', 'is_deal_of_the_day', 'is_top_pick')
        })
        )
admin.site.register(Products,ProductsAdmin)