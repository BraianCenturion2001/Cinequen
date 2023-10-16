from rest_framework.serializers import ModelSerializer

from butacas.api.serializer import ButacaSerializer
from funciones.api.serializer import FuncionSerializer
from butacasxfuncion.models import ButacaxFuncion


class ButacaxFuncionSerializer(ModelSerializer):
    butaca_data = ButacaSerializer(
        source='butaca', read_only=True)
    funcion_data = FuncionSerializer(
        source='funcion', read_only=True)

    class Meta:
        model = ButacaxFuncion
        fields = [
            'id',
            'estado',
            'butaca',
            'butaca_data',
            'funcion',
            'funcion_data',
        ]
