from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.views.generic import View
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer, StaticHTMLRenderer
from rest_framework import status
from work.models import Work, PRIORITY_ATTR, ToPriorityValue, ObjectToPriorityName
from work.serializers import WorkSerializer

class ToDoWorkList(APIView):
    renderer_classes = (TemplateHTMLRenderer, StaticHTMLRenderer,)

    def get(self, request, format=None):
        tasks = Work.objects.all().filter(is_finished=False)
        serializer = WorkSerializer(tasks, many=True)
        import copy
        unfinishlist = copy.deepcopy(serializer.data)
        map(self.foreach_object, unfinishlist)
        # return Response("123124")
        return Response({'prilist':PRIORITY_ATTR,
                         'finishedlist':[],
                         'unfinishlist':unfinishlist,
                         'number': Work.objects.filter(is_finished=False).count()
                         }
                        , template_name='work/todoworklist.html', )

    def foreach_object(self, workdata):
        if workdata['expiretime'] == None:
            workdata['expiretime']=""
        return ObjectToPriorityName(workdata)

    def return_entry(self, workserializer):
        unfinish = []
        if workserializer!=None and workserializer.is_valid():
            # print workserializer.validated_data
            workserializer.save()
            import copy
            workdata = copy.deepcopy(workserializer.data)
            unfinish.append(workdata)
        map(self.foreach_object, unfinish)
        return Response({'prilist': PRIORITY_ATTR,
                         'unfinishlist': unfinish
                         }
                        , template_name='work/__unfinishlist.html', )

    def post(self, request, format=None):
        import copy
        data = copy.deepcopy(request.data)
        if 'priority' in data:
            data['prior'] = ToPriorityValue(data['priority'])
        workserializer = WorkSerializer()
        if data["operation"]=="edit":
            work = Work.objects.get(id=data['id'])
            workserializer = WorkSerializer(work, data)
            return self.return_entry(workserializer)
        elif data['operation']=='add':
            try:
                workserializer = WorkSerializer(data=data)
            except Exception,e:
                import traceback
                print traceback.format_exc(e)
            return self.return_entry(workserializer)
        elif data['operation']=='delete':
            work = Work.objects.get(id=data['id']).delete()
            return self.return_entry(None)
        elif data['operation']=='order':
            tasks = Work.objects.all().filter(is_finished=False).order_by(data['order_by'])
            serializer = WorkSerializer(tasks, many=True)
            import copy
            unfinishlist = copy.deepcopy(serializer.data)
            map(self.foreach_object, unfinishlist)
            # return Response("123124")
            return Response({'prilist': PRIORITY_ATTR,
                             'unfinishlist': unfinishlist
                             }
                            , template_name='work/__unfinishlist.html', )
        elif data['operation']=='mark':
            try:
                work = Work.objects.get(id=data['id'])
                work.is_finished = True
                work.save()
                workserializer = WorkSerializer(work)
                return self.return_entry(None)
            except Exception,e:
                import traceback
                print traceback.format_exc(e)
                return Response({'prilist': PRIORITY_ATTR }
                            , template_name='work/__priority-choice.html', )

class FinishedWorkList(APIView):
    renderer_classes = (TemplateHTMLRenderer, StaticHTMLRenderer,)

    def foreach_object(self, workdata):
        if workdata['expiretime'] == None:
            workdata['expiretime']=""
        return ObjectToPriorityName(workdata)


    def get(self, request, format=None):
        tasks = Work.objects.all().filter(is_finished=True)
        serializer = WorkSerializer(tasks, many=True)
        import copy
        finishlist = copy.deepcopy(serializer.data)
        map(self.foreach_object, finishlist)
        # return Response("123124")
        return Response({'prilist':PRIORITY_ATTR,
                         'finishedlist':finishlist,
                         'unfinishlist':[],
                         'number': Work.objects.filter(is_finished=False).count()
                         }
                        , template_name='work/finishedworklist.html', )
