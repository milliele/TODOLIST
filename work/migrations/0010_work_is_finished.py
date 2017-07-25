# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0009_auto_20170725_1120'),
    ]

    operations = [
        migrations.AddField(
            model_name='work',
            name='is_finished',
            field=models.BooleanField(default=False),
        ),
    ]
