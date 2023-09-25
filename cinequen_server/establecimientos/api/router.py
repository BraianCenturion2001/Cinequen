from rest_framework.routers import DefaultRouter
from establecimientos.api.views import EstablecimientoApiViewSet

router_establecimientos = DefaultRouter()

router_establecimientos.register(
    prefix='establecimientos', basename='establecimientos', viewset=EstablecimientoApiViewSet
)
