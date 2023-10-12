from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from salas.models import Sala
from salas.api.serializer import SalaSerializer
from butacas.models import Butaca

from rest_framework.response import Response
from rest_framework import status


class SalaApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = SalaSerializer
    queryset = Sala.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['establecimiento', 'activa']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Obtener el tipo de sala del serializer validado
        tipo_sala = serializer.validated_data['tipo']

        # Lógica para generar las butacas según el tipo de sala
        if tipo_sala == 'Sala Común':
            filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
            num_columnas = [10, 10, 10, 10, 10, 10, 10, 4, 8, 8]
            for fila, num_butacas in zip(filas, num_columnas):
                for numero in range(1, num_butacas + 1):
                    Butaca.objects.create(
                        fila=fila, numero=numero, sala=serializer.save())
        elif tipo_sala == 'Sala Midway':
            filas = ['A', 'B', 'C', 'D', 'E', 'F',
                     'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
            num_columnas = [4, 13, 13, 13, 13,
                            13, 13, 13, 13, 13, 4, 13, 11, 7]
            for fila, num_butacas in zip(filas, num_columnas):
                for numero in range(1, num_butacas + 1):
                    Butaca.objects.create(
                        fila=fila, numero=numero, sala=serializer.save())
        elif tipo_sala == 'Sala Centurión':
            filas = ['A', 'B', 'C', 'D', 'E', 'F',
                     'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']
            num_columnas = [22, 26, 24, 24, 24, 24, 24,
                            24, 24, 24, 24, 24, 8, 12, 30, 30, 30, 20]
            for fila, num_butacas in zip(filas, num_columnas):
                for numero in range(1, num_butacas + 1):
                    Butaca.objects.create(
                        fila=fila, numero=numero, sala=serializer.save())
        elif tipo_sala == 'Sala 4-Buster':
            filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
            num_columnas = [6, 6, 6, 6, 6, 6, 6]
            for fila, num_butacas in zip(filas, num_columnas):
                for numero in range(1, num_butacas + 1):
                    Butaca.objects.create(
                        fila=fila, numero=numero, sala=serializer.save())

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
