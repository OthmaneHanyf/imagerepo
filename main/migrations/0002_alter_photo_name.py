# Generated by Django 4.0.2 on 2022-02-25 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='name',
            field=models.ImageField(upload_to=''),
        ),
    ]
