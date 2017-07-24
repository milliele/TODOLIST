from django.core.exceptions import ValidationError

PRIORITY_LIST = ['low', 'medium', 'high']

def validate_priority(value):
    if not (type(value) == int and value>=0 and value<3) :
        raise ValidationError('%s is an invalid priority' % str(value))

def validate_priority_str(value):
    if str(value) not in PRIORITY_LIST:
        raise ValidationError('%s is an invalid priority string' % str(value))