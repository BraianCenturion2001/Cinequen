from rest_framework.serializers import ModelSerializer

from establecimientos.api.serializer import EstablecimientoSerializer
from salas.models import Sala


class SalaSerializer(ModelSerializer):
    establecimiento_data = EstablecimientoSerializer(
        source='establecimiento', read_only=True)

    class Meta:
        model = Sala
        fields = [
            'id',
            'nombre',
            'tipo',
            'precio_entrada',
            'activa',
            'establecimiento',
            'establecimiento_data'
        ]
