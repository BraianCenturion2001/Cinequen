from rest_framework.routers import DefaultRouter
from peliculasxestablecimientos.api.views import PeliculaxEstablecimientoApiViewSet

router_peliculasxestablecimientos = DefaultRouter()

router_peliculasxestablecimientos.register(
    prefix='peliculasxestablecimientos', basename='peliculasxestablecimientos', viewset=PeliculaxEstablecimientoApiViewSet
)
