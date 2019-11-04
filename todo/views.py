# todo/views.py

from django.shortcuts import render
from django.conf import settings
from rest_framework import viewsets  # add this
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from .serializers import TodoSerializer  # add this
from .models import Todo  # add this
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
import json
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.middleware.csrf import get_token
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

# @method_decorator(csrf_exempt, name='dispatch')
class TodoViewSet(viewsets.ModelViewSet):       # add this
    serializer_class = TodoSerializer          # add this
    queryset = Todo.objects.all()              # add this
    permission_classes = (AllowAny,)

    def list(self, request, *args, **kwargs):
        if 'todolist' not in cache or cache.get('todolist') is None or len(cache.get('todolist')) is not len(Todo.objects.all()):
            todos = Todo.objects.all()
            todolist = [todo.to_json() for todo in todos]
            cache.set('todolist', todolist, timeout=CACHE_TTL)
        return Response({'todolistFromCache': cache.get('todolist'), 'todolistFromDB': [todo.to_json() for todo in Todo.objects.all()]}, status=HTTP_200_OK)



