from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'company', CompanyDetailsViewSet)
router.register(r'customers', CustomerDetailsViewSet)
router.register(r'expects', ExpectsFromViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'warehouses', WarehouseViewSet)
router.register(r'orders', OrdersViewSet)
router.register(r'products', ProductDetailsViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]