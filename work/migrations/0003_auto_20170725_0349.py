# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0002_auto_20170723_0328'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='work',
            name='expire',
        ),
        migrations.RemoveField(
            model_name='work',
            name='is_finished',
        ),
        migrations.AddField(
            model_name='work',
            name='expiretime',
            field=models.DateTimeField(default=datetime.datetime(2017, 7, 25, 3, 49, 0, 881602, tzinfo=utc), verbose_name=b'expire time'),
            preserve_default=False,
        ),
    ]
