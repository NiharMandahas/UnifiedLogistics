from django.urls import path
from . import views

urlpatterns = [
    path('companies/', views.company_list, name='company-list'),
    path('companies/<str:company_id>/', views.company_detail, name='company-detail'),
]