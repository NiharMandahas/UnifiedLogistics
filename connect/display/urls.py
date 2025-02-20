# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/table/<str:table_name>/', views.get_table_data, name='get_table_data'),
    path('api/table/<str:table_name>/<str:row_id>/', views.update_table_row, name='update_table_row'),
]