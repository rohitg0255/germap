# Generated by Django 3.1.5 on 2021-08-21 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='model1',
            name='capital',
            field=models.CharField(max_length=50, verbose_name='capital name'),
        ),
    ]
