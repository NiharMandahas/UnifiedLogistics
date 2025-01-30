from django.urls import path
from . import views

urlpatterns = [
    path('mongo_query/', views.mongo_query_view, name='mongo_query_view'),
]
