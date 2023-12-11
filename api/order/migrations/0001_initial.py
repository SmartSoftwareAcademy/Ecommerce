# Generated by Django 4.2.6 on 2023-12-11 15:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invoice_id', models.CharField(default='36477481', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=8)),
                ('status', models.CharField(default='pending', max_length=50)),
            ],
            options={
                'verbose_name_plural': 'Invoices',
                'db_table': 'invoices',
                'ordering': ['-created_at'],
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_id', models.CharField(default='36477481', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('order_amount', models.DecimalField(decimal_places=2, max_digits=8)),
                ('payment_status', models.CharField(default='pending', max_length=50)),
                ('confirm_status', models.CharField(default='pending', max_length=50)),
                ('dispatch_status', models.CharField(default='pending', max_length=50)),
                ('delivery_from_date', models.DateTimeField(blank=True, null=True)),
                ('delivery_to_date', models.DateTimeField(blank=True, null=True)),
                ('delivered_status', models.CharField(default='pending', max_length=100)),
            ],
            options={
                'verbose_name_plural': 'Order',
                'db_table': 'order',
                'ordering': ['-created_at'],
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('retail_price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('quantity', models.IntegerField(default=0)),
                ('total', models.IntegerField(default=0)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orderitems', to='order.order')),
            ],
            options={
                'verbose_name_plural': 'Order Items',
                'db_table': 'orderitems',
                'managed': True,
            },
        ),
    ]
