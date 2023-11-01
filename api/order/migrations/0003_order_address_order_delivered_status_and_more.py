# Generated by Django 4.2.6 on 2023-10-31 19:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('human_resource', '0006_remove_addressbook_first_name_and_more'),
        ('order', '0002_deliveries_confirmed_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='human_resource.pickupstations'),
        ),
        migrations.AddField(
            model_name='order',
            name='delivered_status',
            field=models.CharField(default='pending', max_length=100),
        ),
        migrations.AddField(
            model_name='order',
            name='delivery_from_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='delivery_to_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name='Deliveries',
        ),
    ]
