from rest_framework.serializers import ModelSerializer

from butacasxfuncion.models import ButacaxFuncion


class ButacaxFuncionSerializer(ModelSerializer):

    class Meta:
        model = ButacaxFuncion
        fields = [
            'id',
            'estado',
            'butaca',
            'funcion',
        ]
