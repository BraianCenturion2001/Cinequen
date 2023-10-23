from rest_framework.serializers import ModelSerializer

from salas.api.serializer import SalaSerializer
from butacas.models import Butaca


class ButacaSerializer(ModelSerializer):
    sala_data = SalaSerializer(
        source='sala', read_only=True)

    class Meta:
        model = Butaca
        fields = [
            'id',
            'fila',
            'numero',
            'sala',
            'sala_data'
        ]


class ButacaSimpleSerializer(ModelSerializer):
    class Meta:
        model = Butaca
        fields = [
            'id',
            'fila',
            'numero',
            'sala',
        ]
