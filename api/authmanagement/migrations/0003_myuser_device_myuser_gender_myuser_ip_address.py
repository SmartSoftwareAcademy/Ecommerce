# Generated by Django 4.2.6 on 2023-11-01 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authmanagement', '0002_alter_myuser_managers'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='device',
            field=models.CharField(default='Phone', max_length=100),
        ),
        migrations.AddField(
            model_name='myuser',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], default='Other', max_length=10),
        ),
        migrations.AddField(
            model_name='myuser',
            name='ip_address',
            field=models.CharField(default='192.168.0.1', max_length=100),
        ),
    ]