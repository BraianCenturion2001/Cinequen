from rest_framework.routers import DefaultRouter
from peliculas.api.views import PeliculaApiViewSet

router_peliculas = DefaultRouter()

router_peliculas.register(
    prefix='peliculas', basename='peliculas', viewset=PeliculaApiViewSet
)
