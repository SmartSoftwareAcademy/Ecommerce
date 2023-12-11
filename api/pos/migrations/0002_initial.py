# Generated by Django 4.2.6 on 2023-12-11 15:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pos', '0001_initial'),
        ('stockinventory', '0001_initial'),
        ('human_resource', '__first__'),
    ]

    operations = [
        migrations.AddField(
            model_name='salesitems',
            name='stock',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='salesitems', to='stockinventory.stockinventory'),
        ),
        migrations.AddField(
            model_name='sales',
            name='attendant',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='sales', to='human_resource.employee'),
        ),
    ]
