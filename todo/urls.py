from django.urls import path, include
from rest_framework.routers import DefaultRouter

from todo import views
from todo.views import TodoViewSet, TokenAuthViewSet

app_name = 'todo'

router = DefaultRouter()
router.register('todos', TodoViewSet)
router.register('tokenAuth', TokenAuthViewSet)



urlpatterns = [
    # path('csrf/', csrf),
    # path('ping/', ping),
    path('', include(router.urls)),
]
