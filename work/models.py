from django.db import models
from Validators import validate_priority

# Create your models here.

PRIORITY_ATTR = [{'name':'low', 'color':'#37BC9B', 'hovercolor':'#48CFAD'},
                 {'name':'medium', 'color':'#F6BB42', 'hovercolor':'#FFCE54'},
                 {'name':'high', 'color':'#E9573F', 'hovercolor':'#FC6E51'}]

def ToPriorityValue(name):
    for i, obj in enumerate(PRIORITY_ATTR):
        if obj['name']==name:
            return i

def ObjectToPriorityName(x):
    x['priority'] = PRIORITY_ATTR[x['prior']]['name']

class Work(models.Model):
    text = models.CharField('content of work', max_length=500)
    expiretime = models.DateTimeField('expire time', null=True)
    is_finished = models.BooleanField(default=False)
    prior = models.SmallIntegerField('Priority', validators=[validate_priority])