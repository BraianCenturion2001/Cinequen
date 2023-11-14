from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField

from users.api.serializers import ClienteSerializer
from butacasxfuncion.api.serializer import ButacaxFuncionSerializer
from butacasxfuncion.models import ButacaxFuncion
from entradas.models import Entrada
from funciones.api.serializer import FuncionSerializer
from funciones.models import Funcion


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


class EntradaCompletaSerializer(ModelSerializer):
    butacas_data = SerializerMethodField()
    funcion_data = SerializerMethodField()

    class Meta:
        model = Entrada
        fields = [
            'id',
            'estado',
            'user',
            'idsButacasxFuncion',
            'created_at',
            'updated_at',
            'butacas_data',
            'funcion_data'
        ]

    def get_butacas_data(self, obj):
        ids = obj.idsButacasxFuncion.split(',')
        butacas = ButacaxFuncion.objects.filter(id__in=ids)
        serializer = ButacaxFuncionSerializer(butacas, many=True)
        return serializer.data

    def get_funcion_data(self, obj):
        ids = obj.idsButacasxFuncion.split(',')
        butaca = ButacaxFuncion.objects.filter(id__in=ids).first()
        if butaca:
            funcion = Funcion.objects.get(id=butaca.funcion.id)
            serializer = FuncionSerializer(funcion)
            return serializer.data
        else:
            return None
