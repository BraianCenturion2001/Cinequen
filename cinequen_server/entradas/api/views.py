from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from entradas.models import Entrada
from entradas.api.serializer import EntradaClienteSerializer, EntradaSerializer, RegistroEntradaSerializer
from entradas.api.filter import EntradaFilter

from butacasxfuncion.models import ButacaxFuncion

from rest_framework.response import Response
from rest_framework import status


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

    def perform_create(self, serializer):
        entrada = serializer.save()  # Guardar la nueva instancia de Entrada
        ids_butacas = entrada.idsButacasxFuncion.split(
            ',')  # Obtener los IDs de butacas

        # Actualizar el estado de las butacas
        for id_butaca in ids_butacas:
            try:
                butaca_x_funcion = ButacaxFuncion.objects.get(id=id_butaca)
                butaca_x_funcion.estado = 1  # Actualizar el estado a 1
                butaca_x_funcion.save()
            except ButacaxFuncion.DoesNotExist:
                # Manejar el caso de que no se encuentre la butaca por el ID
                pass

        return Response(status=status.HTTP_201_CREATED)
