# Generated by Django 4.2.6 on 2023-11-11 10:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockinventory', '0008_stockinventory_flash_sale_end_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stockinventory',
            name='flash_sale_end_date',
        ),
        migrations.CreateModel(
            name='FrontStore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flash_sale_end_date', models.DateTimeField(default=datetime.datetime(2023, 11, 11, 10, 18, 57, 30604))),
                ('slider_products', models.ManyToManyField(blank=True, null=True, to='stockinventory.stockinventory')),
            ],
            options={
                'verbose_name': 'Front Store',
                'verbose_name_plural': 'Front Store',
                'db_table': 'storefront',
            },
        ),
    ]
