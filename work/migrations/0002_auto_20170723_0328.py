# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='work',
            name='text',
            field=models.CharField(max_length=500, verbose_name=b'content of work'),
        ),
    ]
