# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import work.Validators


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Work',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.TextField(verbose_name=b'content of work')),
                ('expire', models.DateTimeField(verbose_name=b'expire time')),
                ('is_finished', models.BooleanField()),
                ('prior', models.SmallIntegerField(verbose_name=b'Priority', validators=[work.Validators.validate_priority])),
            ],
        ),
    ]
