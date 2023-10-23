from rest_framework.serializers import ModelSerializer

from butacas.api.serializer import ButacaSimpleSerializer
from butacasxfuncion.models import ButacaxFuncion


class ButacaxFuncionSerializer(ModelSerializer):
    butaca_data = ButacaSimpleSerializer(
        source='butaca', read_only=True)

    class Meta:
        model = ButacaxFuncion
        fields = [
            'id',
            'estado',
            'butaca',
            'butaca_data',
            'funcion',
        ]
