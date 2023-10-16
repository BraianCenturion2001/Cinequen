from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from butacasxfuncion.models import ButacaxFuncion
from butacasxfuncion.api.serializer import ButacaSerializer
from butacasxfuncion.api.filters import ButacaxFuncionFilter


class ButacaxFuncionApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ButacaSerializer
    queryset = ButacaxFuncion.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ButacaxFuncionFilter
