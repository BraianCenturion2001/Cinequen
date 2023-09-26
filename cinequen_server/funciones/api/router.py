from rest_framework.routers import DefaultRouter
from funciones.api.views import FuncionApiViewSet

router_funciones = DefaultRouter()

router_funciones.register(
    prefix='funciones', basename='funciones', viewset=FuncionApiViewSet
)
