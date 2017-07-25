# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0004_auto_20170725_1017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='work',
            name='expiretime',
            field=models.DateTimeField(verbose_name=b'expire time', blank=True),
        ),
    ]
