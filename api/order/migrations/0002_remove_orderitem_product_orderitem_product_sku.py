# Generated by Django 4.2.6 on 2023-11-05 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='product',
        ),
        migrations.AddField(
            model_name='orderitem',
            name='product_sku',
            field=models.CharField(default='99', max_length=100),
        ),
    ]