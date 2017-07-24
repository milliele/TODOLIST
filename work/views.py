from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, Http404
from django.template import RequestContext, loader
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework import status
from work.models import Work
from work.serializers import WorkSerializer

class ToDoWorkList(APIView):
    renderer_classes = (TemplateHTMLRenderer,)

    def get(self, request, format=None):
        tasks = Work.objects.all()
        serializer = WorkSerializer(tasks, many=True)
        return Response({'number':13}, template_name='work/todoworklist.html')