# Generated by Django 4.2.6 on 2023-11-04 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockinventory', '0005_alter_stockinventory_product_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockinventory',
            name='serial',
            field=models.CharField(default='12263644', max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='stockinventory',
            name='sku',
            field=models.CharField(default='1', max_length=100, unique=True),
        ),
    ]