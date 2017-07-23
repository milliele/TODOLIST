from work.models import Work
from rest_framework import serializers

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = ('text', 'expire', 'is_finished', 'prior')
