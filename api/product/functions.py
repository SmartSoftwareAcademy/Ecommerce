import pandas as pd
import numpy as np
import os
from pathlib import Path
from django.core.files import File
from .models import Products,ProductSize,ProductImages,MainCategory,Unit,Category,Subcategory
from stockinventory.models import StockInventory
from datetime import datetime
import re
import math
import uuid
from random import randint
from django.conf import settings
BASE_DIR=settings.BASE_DIR

image_dir = BASE_DIR / 'media' / 'products' / 'images'
excel_file_path = os.path.join(
    BASE_DIR, 'api', 'media', 'products', 'YOGISSHOPDATABASE.xlsx')

class ExcelProductsImport:
    def __init__(self):
        pass

    def find_matching_image(self,title):
        for file_name in os.listdir('E:\projects\Ecommerce\\api\media\products\images'):
            if any(substring.lower() in str(title) for substring in file_name.split(' ')):
                return file_name
        return 'other.png'  # Default image if no match is found

    def import_products_and_images(self,vendor,supplier):
        df = pd.read_excel('E:\projects\Ecommerce\\api\media\products\YOGISSHOPDATABASE.xlsx',dtype={'CODES': str})
        # Fill NaN values with random unique numbers
        df['UNIT PRICE'].fillna(0.0,inplace=True)
        df['RETAIL PRICE'].fillna(0.0,inplace=True)
        df['WHOLESALE PRICE'].fillna(1.0,inplace=True)
        df['QTY'] = df.apply(lambda row: math.ceil(row['WHOLESALE PRICE'] / row['RETAIL PRICE'])\
                                if pd.isna(row['QTY']) else row['QTY'], axis=1)
        df['UNIT PRICE'] = df.apply(lambda row: float(row['WHOLESALE PRICE']) / float(row['UNIT PRICE'])\
                                if pd.isna(row['QTY']) else row['QTY'], axis=1)
        #replace empty values with 1
        df['PACKAGING'].fillna(1,inplace=True)
        df['CODES'] = df['CODES'].apply(lambda x: str(uuid.uuid4())[0:7] if pd.isna(x) else x)
        #df=df.head(1)
        for i, row in df.iterrows():
            # Create and save Products instance
            packaging=row['PACKAGING']
            serial = row['CODES'] if not pd.isna(row['CODES']) else str(i)+str(uuid.uuid4()[-1:18])
            print(str(uuid.uuid4()))
            sku = str(i)+str(uuid.uuid4())[0:6]
            m_name=row['MAIN CATEGORY'].replace('Name: MAIN CATEGORY, dtype: object','').split("0")[0]
            c_name=row['CATEGORY'].replace('Name: CATEGORY, dtype: object','').split("0")[0]
            sb_name=row['SUB CATEGORY'].replace('Name: CATEGORY, dtype: object','').split("0")[0]
            maincategory, created = MainCategory.objects.get_or_create(
                name=m_name)
            category, created = Category.objects.get_or_create(name=c_name)
            maincategory.categories.add(category)
            subcategory,created=Subcategory.objects.get_or_create(name=sb_name)
            category.Subcategories.add(subcategory)
            maincategory.save()
            category.save()

            product,created= Products.objects.get_or_create(
                defaults={
                'maincategory':maincategory,  # You might need to set the main category
                'vendor':vendor,  # You might need to set the vendor
                'model':'',
                'title':row['ITEM'],
                'description':f"{row['ITEM']} {packaging}",
                'retail_price':row['UNIIT PRICE'] if packaging == None else 0,
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
            image_name = self.find_matching_image(product.title)
            image_path = Path(image_dir) /image_name
            with open(image_path, 'rb') as image_file:
                pimage=ProductImages(product=product)
                pimage.image.save(image_name,File(image_file))
                pimage.save()
            # Create and save StockInventory instances for each size variation
            punit=re.search(r'([a-zA-Z]+)',str(packaging))
            punit=punit.group(0) if punit else 'piece(s)'
            psize=re.compile(r'\D+').sub('',str(packaging))
            print(punit,psize)
            unit,created=Unit.objects.get_or_create(
                defaults={
                    'unit_title':punit,
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
                'sku':sku,
                'serial':serial,
                'supplier':supplier,
                'availability':'In Stock',
                },
                size=size,
                serial=serial,
                sku=sku,
                stock_level=row['QTY'],
            )

    # Print a message indicating successful import
    print("Products and variations imported successfully.")
