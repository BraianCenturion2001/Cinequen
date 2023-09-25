from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from peliculas.models import Pelicula
from peliculas.api.serializer import PeliculaSerializer


class PeliculaApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PeliculaSerializer
    queryset = Pelicula.objects.all()
