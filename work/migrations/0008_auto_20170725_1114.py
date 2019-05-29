# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0007_auto_20170725_1111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='work',
            name='expiretime',
            field=models.DateTimeField(default=datetime.datetime(2017, 7, 25, 11, 14, 29, 163090, tzinfo=utc), verbose_name=b'expire time', blank=True),
            preserve_default=False,
        ),
    ]
