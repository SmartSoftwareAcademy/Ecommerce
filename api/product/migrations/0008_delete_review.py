# Generated by Django 4.2.6 on 2023-11-05 05:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0007_remove_products_availability_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Review',
        ),
    ]
