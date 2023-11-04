# Generated by Django 4.2.6 on 2023-11-04 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockinventory', '0002_stockinventory_supplier'),
    ]

    operations = [
        migrations.AddField(
            model_name='stockinventory',
            name='serial',
            field=models.CharField(default='12263644', max_length=100),
        ),
        migrations.AddField(
            model_name='stockinventory',
            name='sku',
            field=models.CharField(default='1', max_length=100),
        ),
        migrations.AddField(
            model_name='stockinventory',
            name='usage',
            field=models.CharField(blank=True, choices=[('EX-UK', 'EX-UK'), ('Refurbished', 'Refurbished'), ('New', 'New')], default='New', help_text='Leave blank if not applicable', max_length=20, null=True),
        ),
    ]
