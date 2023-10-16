from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from funciones.models import Funcion
from funciones.api.serializer import FuncionSerializer
from funciones.api.filters import FuncionFilter

from butacas.models import Butaca
from butacasxfuncion.models import ButacaxFuncion

from rest_framework.response import Response
from rest_framework import status


class FuncionApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = FuncionSerializer
    queryset = Funcion.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = FuncionFilter

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Guardar la función
        self.perform_create(serializer)

        # Obtener la sala de la función creada
        sala = serializer.validated_data['sala']

        # Obtener todas las butacas de la sala
        butacas = Butaca.objects.filter(sala=sala)

        # Crear un ButacaxFuncion para cada butaca
        for butaca in butacas:
            ButacaxFuncion.objects.create(
                butaca=butaca, funcion=serializer.instance)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
