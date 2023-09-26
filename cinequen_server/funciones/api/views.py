from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from funciones.models import Funcion
from funciones.api.serializer import FuncionSerializer
from funciones.api.filters import FuncionFilter


class FuncionApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = FuncionSerializer
    queryset = Funcion.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = FuncionFilter
