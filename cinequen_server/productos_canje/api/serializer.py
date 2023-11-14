from rest_framework.serializers import ModelSerializer

from productos_canje.models import ProductoCanje


class ProductoCanjeSerializer(ModelSerializer):

    class Meta:
        model = ProductoCanje
        fields = [
            'id',
            'nombre',
            'imagen',
            'tipo',
            'descripcion',
            'precio_puntos',
            'stock',
        ]
