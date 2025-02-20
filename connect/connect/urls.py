"""connect URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('home.urls')),
    path('user/sql/',include('deployment.urls')),
    path('user/nosql/',include('mongo.urls')),
    path('api/', include('deployment.urls')),
   # path('api/', include('mongo.urls')),
    path('',include('display.urls')),
    path('api/', include('display.urls')),
    path('api/', include('authenticate.urls')),
    path('api/', include('Company.urls')),
    path('', include('FetchOrder.urls')),
    path('', include('ADD.urls')),
]
