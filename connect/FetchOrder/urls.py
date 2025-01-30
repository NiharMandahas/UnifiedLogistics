from django.urls import path
from .views import search_order

urlpatterns = [
    path('search-order/', search_order, name='search_order'),
]
