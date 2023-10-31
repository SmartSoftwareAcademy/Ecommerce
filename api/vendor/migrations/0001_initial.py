# Generated by Django 4.2.6 on 2023-10-11 20:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('human_resource', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vendor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='TDBSoft', max_length=255)),
                ('address', models.ManyToManyField(to='human_resource.businessaddress')),
                ('customers', models.ManyToManyField(blank=True, null=True, to='human_resource.customer')),
                ('delivery_addresses', models.ManyToManyField(blank=True, null=True, to='human_resource.deliveryregions')),
                ('employees', models.ManyToManyField(blank=True, null=True, to='human_resource.employee')),
                ('suppliers', models.ManyToManyField(blank=True, null=True, to='human_resource.supplier')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vendor', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Vendors',
                'db_table': 'vendors',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('rating', models.PositiveIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to=settings.AUTH_USER_MODEL)),
                ('vendor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='vendor.vendor')),
            ],
            options={
                'verbose_name_plural': 'Vendor Ratings',
                'db_table': 'vendor_ratiings',
                'managed': True,
            },
        ),
    ]
