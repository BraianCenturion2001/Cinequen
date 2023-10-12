from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from butacas.models import Butaca
from butacas.api.serializer import ButacaSerializer


class ButacaApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ButacaSerializer
    queryset = Butaca.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['fila', 'numero', 'sala']
