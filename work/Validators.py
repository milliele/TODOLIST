from django.core.exceptions import ValidationError

def validate_priority(value):
    if not (type(value) == int and value>=0 and value<3) :
        raise ValidationError('%s is an invalid priority' % str(value))