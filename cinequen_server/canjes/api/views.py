from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from canjes.models import Canje
from canjes.api.filters import CanjeFilter
from canjes.api.serializer import CanjeCompletoSerializer, CanjeSimpleSerializer, CanjeProductoSerializer

from users.models import Cliente
from productos_canje.models import ProductoCanje


class CanjeApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CanjeCompletoSerializer
    queryset = Canje.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = CanjeFilter

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CanjeSimpleSerializer
        elif self.request.query_params.get('cliente') is not None:
            return CanjeProductoSerializer
        return CanjeCompletoSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Buscar el objeto Cliente correspondiente
        cliente = Cliente.objects.get(user_id=request.data.get('cliente'))
        # Restar los puntos_restados del serializer a los puntos del cliente
        puntos_restados = serializer.validated_data['puntos_restados']
        if cliente.puntos < puntos_restados:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Buscar el producto de canje correspondiente
        producto = ProductoCanje.objects.get(id=request.data.get('producto'))
        if producto.stock < 1:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Restar los puntos_restados del serializer a los puntos del cliente
        cliente.puntos -= puntos_restados
        cliente.save()

        # Restar 1 al stock del producto
        producto.stock -= 1
        producto.save()

        # Crear el objeto Canje
        self.perform_create(serializer)

        return Response(status=status.HTTP_201_CREATED)
