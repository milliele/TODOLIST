from work.models import Work
from rest_framework import serializers
from Validators import validate_priority_str

class WorkSerializer(serializers.ModelSerializer):
    priority = serializers.CharField(max_length=10, validators=validate_priority_str)

    class Meta:
        model = Work
        fields = ('text', 'expire', 'is_finished', 'prior','id')

    def Create(self, validated_data):
        work = Work(**validated_data)

