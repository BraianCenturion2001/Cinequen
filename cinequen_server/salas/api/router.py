from rest_framework.routers import DefaultRouter
from salas.api.views import SalaApiViewSet

router_salas = DefaultRouter()

router_salas.register(
    prefix='salas', basename='salas', viewset=SalaApiViewSet
)
