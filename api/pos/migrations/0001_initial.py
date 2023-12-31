# Generated by Django 4.2.6 on 2023-12-11 15:44

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
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
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(blank=True, default='pending', max_length=20, null=True)),
                ('paymethod', models.CharField(blank=True, choices=[('cash', 'Cash'), ('mpesa', 'Mpesa'), ('mpesa_on_delivery', 'Mpesa on Delivery')], default='cash', max_length=20, null=True)),
                ('sales_type', models.CharField(choices=[('walk-in', 'walk-in customer'), ('online', 'online customer')], default='walk-in customer', max_length=20)),
            ],
            options={
                'verbose_name': 'Sales',
                'verbose_name_plural': 'Sales',
                'db_table': 'sales',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clientName', models.CharField(max_length=255)),
                ('clientId', models.CharField(max_length=255)),
                ('transactionType', models.CharField(choices=[('deposit', 'deposit'), ('withdrawal', 'withdrawal')], default='withdrawal', max_length=20)),
                ('transactionRef', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'verbose_name': 'Mpesa Transactions',
                'verbose_name_plural': 'Mpesa Transactions',
                'db_table': 'mpesa_transactions',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='salesItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('retail_price', models.FloatField(default=0)),
                ('qty', models.FloatField(default=0)),
                ('total', models.FloatField(default=0)),
                ('date_added', models.DateTimeField(default=django.utils.timezone.now)),
                ('date_updated', models.DateTimeField(auto_now=True)),
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
