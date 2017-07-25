from work.models import Work
from rest_framework import serializers

class WorkSerializer(serializers.ModelSerializer):

    expiretime = serializers.DateTimeField(format="%Y-%m-%d %H:%M", allow_null=True)

    class Meta:
        model = Work
        fields = ('text', 'expiretime', 'prior', 'id','is_finished')
        read_only_fields = ('id',)