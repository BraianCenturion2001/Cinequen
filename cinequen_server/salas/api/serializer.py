from rest_framework.serializers import ModelSerializer

from establecimientos.api.serializer import EstablecimientoSerializer
from salas.models import Sala


class SalaSerializer(ModelSerializer):
    establecimiento_data = EstablecimientoSerializer(
        source='establecimiento', read_only=True)

    class Meta:
        model = Sala
        fields = [
            'nombre',
            'tipo',
            'precio_entrada',
            'establecimiento',
            'establecimiento_data'
        ]
