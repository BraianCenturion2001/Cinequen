from rest_framework.serializers import ModelSerializer

from canjes.models import Canje
from users.api.serializers import ClienteSerializer
from productos_canje.api.serializer import ProductoCanjeSerializer


class CanjeSimpleSerializer(ModelSerializer):

    class Meta:
        model = Canje
        fields = [
            'id',
            'fecha',
            'puntos_restados',
            'cliente',
            'producto',
        ]


class CanjeCompletoSerializer(ModelSerializer):

    cliente_data = ClienteSerializer(
        source='cliente', read_only=True)
    producto_data = ProductoCanjeSerializer(
        source='producto', read_only=True)

    class Meta:
        model = Canje
        fields = [
            'id',
            'fecha',
            'puntos_restados',
            'cliente',
            'producto',
            'cliente_data',
            'producto_data'
        ]


class CanjeProductoSerializer(ModelSerializer):
    producto_data = ProductoCanjeSerializer(
        source='producto', read_only=True)

    class Meta:
        model = Canje
        fields = [
            'id',
            'fecha',
            'puntos_restados',
            'cliente',
            'producto',
            'producto_data'
        ]
