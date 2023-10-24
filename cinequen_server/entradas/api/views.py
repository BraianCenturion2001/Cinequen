from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from entradas.models import Entrada
from entradas.api.serializer import EntradaClienteSerializer, EntradaSerializer, RegistroEntradaSerializer
from entradas.api.filter import EntradaFilter


class EntradaApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RegistroEntradaSerializer
        elif 'user' in self.request.query_params:
            return EntradaSerializer
        return EntradaClienteSerializer

    queryset = Entrada.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = EntradaFilter
