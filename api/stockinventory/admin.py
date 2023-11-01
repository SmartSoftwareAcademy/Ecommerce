from django.contrib import admin
from .models import *
# Register your models here.
class InventoryAdmin(admin.ModelAdmin):
    list_display=['product','stock_level','reorder_level','size','color']
    list_filter=['product','stock_level','reorder_level','size','color']
    search_fields=['product','stock_level','reorder_level','size','color']

admin.site.register(StockInventory,InventoryAdmin)
