from rest_framework.routers import DefaultRouter
from entradas.api.views import EntradaApiViewSet

router_entradas = DefaultRouter()

router_entradas.register(
    prefix='entradas', basename='entradas', viewset=EntradaApiViewSet
)
