# Generated by Django 4.2.6 on 2023-11-02 15:10

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('human_resource', '0001_initial'),
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=100, null=True)),
                ('sub_total', models.FloatField(default=0)),
                ('grand_total', models.FloatField(default=0)),
                ('tax_amount', models.FloatField(default=0)),
                ('tax', models.FloatField(default=0)),
                ('tendered_amount', models.FloatField(default=0)),
                ('amount_change', models.FloatField(default=0)),
                ('date_added', models.DateTimeField(default=django.utils.timezone.now)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(blank=True, default='pending', max_length=20, null=True)),
                ('paymethod', models.CharField(blank=True, default='cash', max_length=20, null=True)),
                ('sales_type', models.CharField(default='walk-in customer', max_length=20)),
                ('attendant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='sales', to='human_resource.employee')),
            ],
            options={
                'verbose_name': 'Sales',
                'verbose_name_plural': 'Sales',
                'db_table': 'sales',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit_title', models.CharField(max_length=50)),
                ('unit_symbol', models.CharField(max_length=5)),
            ],
            options={
                'verbose_name_plural': 'Units',
                'db_table': 'units',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SpecialOffers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('offer_title', models.CharField(max_length=200)),
                ('label', models.CharField(choices=[('New', 'New'), ('Hot', 'Hot'), ('Premium', 'Premium'), ('Sponsored', 'Sponsored')], default='Hot', max_length=50)),
                ('offer_from_date', models.DateField()),
                ('offer_to_date', models.DateField()),
                ('products', models.ManyToManyField(to='product.products')),
            ],
            options={
                'verbose_name': 'Special Offer',
                'verbose_name_plural': 'Special Offers',
                'db_table': 'special_offers',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='salesItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField(default=0)),
                ('qty', models.FloatField(default=0)),
                ('total', models.FloatField(default=0)),
                ('date_added', models.DateTimeField(default=django.utils.timezone.now)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='salesitems', to='product.products')),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='salesitems', to='pos.sales')),
            ],
            options={
                'verbose_name': 'Sales Items',
                'verbose_name_plural': 'Sales Items',
                'db_table': 'salesitems',
                'managed': True,
            },
        ),
    ]
