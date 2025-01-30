# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/table/<str:table_name>/', views.get_table_data, name='get_table_data'),
]