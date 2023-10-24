from rest_framework.serializers import ModelSerializer

from users.api.serializers import ClienteSerializer
from entradas.models import Entrada


class EntradaClienteSerializer(ModelSerializer):
    user_data = ClienteSerializer(
        source='user', read_only=True)

    class Meta:
        model = Entrada
        fields = [
            'id',
            'estado',
            'idsButacasxFuncion',
            'user',
            'user_data',
            'created_at',
            'updated_at',
        ]

class RegistroEntradaSerializer(ModelSerializer):

    class Meta:
        model = Entrada
        fields = [
            'user',
            'idsButacasxFuncion',
        ]

class EntradaSerializer(ModelSerializer):

    class Meta:
        model = Entrada
        fields = [
            'id',
            'estado',
            'user',
            'idsButacasxFuncion',
            'created_at',
            'updated_at',
        ]
