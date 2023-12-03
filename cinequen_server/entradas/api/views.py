from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status

from entradas.models import Entrada
from entradas.api.serializer import EntradaClienteSerializer, EntradaSerializer, RegistroEntradaSerializer, EntradaCompletaSerializer
from entradas.api.filter import EntradaFilter

from butacasxfuncion.api.serializer import ButacaxFuncionSerializer
from funciones.api.serializer import FuncionSerializer
from funciones.models import Funcion
from butacasxfuncion.models import ButacaxFuncion
from users.models import Cliente

from rest_framework.response import Response


class EntradaApiViewSet(ModelViewSet):
    permissions_classes = []

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RegistroEntradaSerializer
        elif self.request.query_params.get('user') is not None or self.request.query_params.get('id') is not None:
            return EntradaCompletaSerializer
        return EntradaClienteSerializer

    queryset = Entrada.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = EntradaFilter

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        entrada_data = serializer.data
        ids = instance.idsButacasxFuncion.split(',')
        butacas = ButacaxFuncion.objects.filter(id__in=ids)
        butacas_data = ButacaxFuncionSerializer(butacas, many=True).data
        entrada_data['butacas_data'] = butacas_data
        id_funcion = butacas_data[0]['funcion']
        funcion = Funcion.objects.get(id=id_funcion)
        funcion_data = FuncionSerializer(funcion).data
        entrada_data['funcion_data'] = funcion_data
        return Response(entrada_data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        entrada = self.perform_create(serializer)
        qr_value = f"http://192.168.100.7:8000/api/entradas/{entrada.pk}/"
        headers = self.get_success_headers(serializer.data)
        return Response({'qr_value': qr_value}, status=status.HTTP_201_CREATED, headers=headers)

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

        # Sumar puntos al cliente
        cliente = Cliente.objects.get(user_id=entrada.user)
        # Obtener el valor del parámetro tipo_sala
        tipo_sala = self.request.data.get('tipo_sala')

        if tipo_sala == 'Sala Común':
            cliente.puntos += 100  # Sumar 5 puntos para sala1
        elif tipo_sala == 'Sala Midway':
            cliente.puntos += 250  # Sumar 10 puntos para sala2
        elif tipo_sala == 'Sala Centurión':
            cliente.puntos += 500  # Sumar 10 puntos para sala2
        else:
            cliente.puntos += 1000  # Sumar 1 punto para otros casos

        cliente.save()

        return entrada
