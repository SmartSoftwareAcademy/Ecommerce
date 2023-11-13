import pandas as pd
import os
from pathlib import Path
from django.core.files import File
from .models import Products,ProductImages,ProductSize
from stockinventory.models import StockInventory
from datetime import datetime

def find_matching_image(title, image_dir):
    for file_name in os.listdir(image_dir):
        if any(substring.lower() in title.lower() for substring in file_name.split(' ')):
            return file_name
    return 'other.png'  # Default image if no match is found

def import_products_and_images(excel_file_path, image_dir,vendor,supplier):
    df = pd.read_excel(excel_file_path)
    for i, row in df.iterrows():
        # Create and save Products instance
        product = Products.objects.get_or_create(
            defaults={
            'maincategory':['MAIN CATEGORY'],  # You might need to set the main category
            'vendor':vendor,  # You might need to set the vendor
            'model':'',
            'title':row['ITEM'],
            'description':f"{row['ITEM']} {row['PACKAGING']}",
            'unit_retail_price':row['UNIIT retail_price'] if row['PACKAGING'] == None else 0,
            'retail_price':row['RETAIL retail_price'] if row['PACKAGING'] == None else 0,
            'discount_price':None,  # You might need to set the discount retail_price
            'status':1,
            'date_added':datetime.now(),  # You might need to set the date_added
            'date_updated':datetime.now(),  # You might need to set the date_updated
            'weight':'',
            'dimentions':''
            },
            title=row['ITEM'],
        )
        # Create and save StockInventory instances for each size variation
        size,created=ProductSize.objects.get_or_create(

        )
        stock,created= StockInventory.objects.get_or_create(
            defaults={
            'product':product,
            'stock_level':row['QTY'],
            'reorder_level':5,
            'size':'',
            'sku':i,
            'serial':row['CODES'],
            'supplier':supplier,
            'availability':'In Stock',
            }
            size=
        )

# Print a message indicating successful import
print("Products and variations imported successfully.")
