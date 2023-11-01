# Generated by Django 4.2.6 on 2023-11-01 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0006_products_discount_price_products_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='productsize',
            name='unit_dicount_price',
            field=models.FloatField(blank=True, default=0.0, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='productsize',
            name='unit_price',
            field=models.FloatField(default=0.0, max_length=100),
        ),
    ]
