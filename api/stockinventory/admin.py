from django.contrib import admin
from .models import *
# Register your models here.
class StockInventoryAdmin(admin.ModelAdmin):
    list_display = (
        'product', 'stock_level', 'reorder_level', 'availability',
        'is_new_arrival', 'is_favorite', 'is_flash_sale', 'is_deal_of_the_day', 'is_top_pick'
    )
    list_filter = ('availability', 'is_new_arrival', 'is_favorite', 'is_flash_sale', 'is_deal_of_the_day', 'is_top_pick')
    search_fields = ('product__name', 'product__sku', 'product__serial')

    fieldsets = [
        ('Product Information', {
            'fields': ['product', 'stock_level', 'reorder_level', 'size', 'color'],
        }),
        ('Additional Information', {
            'fields': ['usage', 'sku', 'serial', 'supplier'],
        }),
        ('Availability and Promotions', {
            'fields': ['availability', 'is_new_arrival', 'is_favorite', 'is_flash_sale', 'is_deal_of_the_day', 'is_top_pick'],
        }),
    ]

admin.site.register(StockInventory, StockInventoryAdmin)
