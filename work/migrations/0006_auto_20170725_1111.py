# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0005_auto_20170725_1044'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='work',
            options={},
        ),
        migrations.AlterField(
            model_name='work',
            name='expiretime',
            field=models.DateTimeField(verbose_name=b'expire time'),
        ),
    ]
