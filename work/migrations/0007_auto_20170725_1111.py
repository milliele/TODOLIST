# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0006_auto_20170725_1111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='work',
            name='expiretime',
            field=models.DateTimeField(null=True, verbose_name=b'expire time'),
        ),
    ]
