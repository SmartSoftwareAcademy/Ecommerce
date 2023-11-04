# Generated by Django 4.2.6 on 2023-11-03 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_rename_unit_dicount_price_productsize_unit_discount_price'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='unit',
            options={'managed': True, 'verbose_name_plural': 'Units'},
        ),
        migrations.RenameField(
            model_name='unit',
            old_name='name',
            new_name='unit_title',
        ),
        migrations.AddField(
            model_name='unit',
            name='unit_symbol',
            field=models.CharField(default='ml', max_length=5),
            preserve_default=False,
        ),
        migrations.AlterModelTable(
            name='unit',
            table='units',
        ),
    ]
