# Generated by Django 4.2.6 on 2023-10-12 10:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductColor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='ProductSize',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(max_length=10)),
            ],
        ),
        migrations.RemoveField(
            model_name='products',
            name='variations',
        ),
        migrations.AddField(
            model_name='favourites',
            name='is_favorite',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='products',
            name='is_deal_of_the_day',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='products',
            name='is_flash_sale',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='products',
            name='is_new_arrival',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='products',
            name='is_top_pick',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='Variations',
        ),
        migrations.AddField(
            model_name='productsize',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.products'),
        ),
        migrations.AddField(
            model_name='productcolor',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.products'),
        ),
    ]
