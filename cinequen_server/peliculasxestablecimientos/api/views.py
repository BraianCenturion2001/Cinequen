from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from peliculasxestablecimientos.models import PeliculaxEstablecimiento
from peliculasxestablecimientos.api.serializer import PeliculaxEstablecimientoSerializer


class PeliculaxEstablecimientoApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PeliculaxEstablecimientoSerializer
    queryset = PeliculaxEstablecimiento.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['establecimiento', 'pelicula', 'activo', 'tipo']
