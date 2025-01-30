from django.urls import path
from . import views

urlpatterns = [
    path('text-editor/', views.text_editor_view, name='text_editor_view'),  # For generating SQL query
    path('execute-query/', views.execute_query_view, name='execute_query_view'),  # For executing SQL query
]
