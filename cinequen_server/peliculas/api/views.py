from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from peliculas.models import Pelicula
from peliculas.api.serializer import PeliculaSerializer
from peliculas.api.filter import PeliculaFilter


class PeliculaApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PeliculaSerializer
    queryset = Pelicula.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = PeliculaFilter
