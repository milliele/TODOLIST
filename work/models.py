from django.db import models
from Validators import validate_priority

# Create your models here.

class Work(models.Model):
    text = models.CharField('content of work', max_length=500)
    expire = models.DateTimeField('expire time')
    is_finished = models.BooleanField()
    prior = models.SmallIntegerField('Priority', validators=[validate_priority])