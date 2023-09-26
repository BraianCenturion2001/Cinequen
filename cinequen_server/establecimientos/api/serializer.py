from rest_framework.serializers import ModelSerializer
from establecimientos.models import Establecimiento


class EstablecimientoSerializer(ModelSerializer):
    class Meta:
        model = Establecimiento
        fields = [
            'id',
            'nombre',
            'direccion',
            'ciudad',
            'provincia',
            'horario_apertura',
        ]
