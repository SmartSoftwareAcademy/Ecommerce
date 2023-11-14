import pandas as pd
import os
from pathlib import Path
from django.core.files import File
from .models import Products,ProductImages,ProductSize,Unit
from stockinventory.models import StockInventory
from datetime import datetime
import re
import math

BASE_DIR = Path(__file__).resolve().parent.parent
image_dir = BASE_DIR / 'api' / 'media' / 'products' / 'images'
excel_file_path=BASE_DIR / 'api' / 'media' / 'products'

def find_matching_image(title):
    for file_name in os.listdir():
        if any(substring.lower() in title.lower() for substring in file_name.split(' ')):
            return file_name
    return 'other.png'  # Default image if no match is found

def extract_sizes(text):
    numbers = re.findall(r'\b\d+\b', str(text))
    return ''.join(numbers)

def import_products_and_images(vendor,supplier):
    df = pd.read_excel(os.path.join(excel_file_path,'YOGISSHOPDATABASE.xlsx'))
    # Perform the calculation to fill NaN values in the "UNIT PRICE" column
    df['QTY'] = df.apply(lambda row: math.ceil(row['WHOLESALE PRICE'] / row['RETAIL PRICE'])\
                            if pd.isna(row['QTY']) else row['QTY'], axis=1)
    df['UNIT PRICE'] = df.apply(lambda row: float(row['WHOLESALE PRICE']) / float(row['UNIT PRICE'])\
                            if pd.isna(row['QTY']) else row['QTY'], axis=1)
    #replace empty values with 1
    df['PACKAGING'].fillna(1,inplace=True)
    print(df.head(10))
    for i, row in df.iterrows():
        # Create and save Products instance
        packaging=row['PACKAGING']
        serial=row['CODES']
        product = Products.objects.get_or_create(
            defaults={
            'maincategory':['MAIN CATEGORY'],  # You might need to set the main category
            'vendor':vendor,  # You might need to set the vendor
            'model':'',
            'title':row['ITEM'],
            'description':f"{row['ITEM']} {packaging}",
            'unit_retail_price':row['UNIIT PRICE'] if packaging == None else 0,
            'retail_price':row['RETAIL PRICE'] if packaging == None else 0,
            'discount_price':None,  # You might need to set the discount retail_price
            'status':1,
            'date_added':datetime.now(),  # You might need to set the date_added
            'date_updated':datetime.now(),  # You might need to set the date_updated
            'weight':'',
            'dimentions':''
            },
            title=row['ITEM'],
        )
        # Find matching images for the product title
        for _ in range(3):  # Limit to 3 images
            image_name = find_matching_image(product.title, image_dir)
            image_path = Path(image_dir) /image_name
            if image_path.exists():
                with open(image_path, 'rb') as image_file:
                    pimage=ProductImages(product=product)
                    pimage.image.save(image_name,File(image_file))
                    pimage.save()
        # Create and save StockInventory instances for each size variation
        punit=re.compile(r'[^0-9.]').sub('', packaging)
        psize=extract_sizes(packaging)
        unit,created=Unit.objects.get_or_create(
            defaults={
                'unit_title':psize,
                'unit_symbol':punit,
            },
            unit_title=punit,
        )
        size,created=ProductSize.objects.get_or_create(
            defaults={
                'product':product,
                'size':psize,
                'unit':unit,
                'unit_price':row['UNIT PRICE'],
                'retail_price':row['RETAIL PRICE'],
                'unit_discount_price':0,
            },
            size=psize,
            unit=unit,
        )
        stock,created= StockInventory.objects.get_or_create(
            defaults={
            'product':product,
            'stock_level':row['QTY'],
            'reorder_level':5,
            'size':size,
            'sku':i,
            'serial':serial,
            'supplier':supplier,
            'availability':'In Stock',
            },
            size=size,
            serial=serial,
        )

# Print a message indicating successful import
print("Products and variations imported successfully.")
