
from django.urls import path, include
from rest_framework import routers
from .views import *
router = routers.DefaultRouter()

router = routers.DefaultRouter()
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('salesList/', salesList),
    path('salesadd/', save_pos),
    path('sales/<int:id>/', delete_sale),
    path('completesales/<int:id>/<str:code>/', complete_sale),
]
