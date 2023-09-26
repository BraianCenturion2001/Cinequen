from rest_framework.serializers import ModelSerializer
from salas.models import Sala


class SalaSerializer(ModelSerializer):
    class Meta:
        model = Sala
        fields = [
            'nombre',
            'tipo',
            'precio_entrada',
            'establecimiento',
        ]
