from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Sales)
admin.site.register(salesItems)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('transactionRef', 'clientName',
                    'clientId', 'transactionType','amount', )
    list_editable = ['clientName', 'clientId', 'transactionType','amount',]
    list_display_links = ['transactionRef']  # Choose a field for editing links
    list_filter = ('clientName', 'clientId', 'transactionType',
                   'transactionRef', 'amount', )
    search_fields= ('clientName', 'clientId', 'transactionType', 'transactionRef','amount', )

admin.site.register(Transaction,TransactionAdmin)

