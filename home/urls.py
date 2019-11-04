from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers  # add this
from django.views.generic import TemplateView
from todo import views  # add this


urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('todo.urls')),

    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
