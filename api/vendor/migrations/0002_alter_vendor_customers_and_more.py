# Generated by Django 4.2.6 on 2023-11-19 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('human_resource', '0001_initial'),
        ('vendor', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendor',
            name='customers',
            field=models.ManyToManyField(blank=True, null=True, related_name='vendors', to='human_resource.customer'),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='delivery_addresses',
            field=models.ManyToManyField(blank=True, null=True, related_name='vendors', to='human_resource.deliveryregions'),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='employees',
            field=models.ManyToManyField(blank=True, null=True, related_name='vendors', to='human_resource.employee'),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='suppliers',
            field=models.ManyToManyField(blank=True, null=True, related_name='vendors', to='human_resource.supplier'),
        ),
    ]