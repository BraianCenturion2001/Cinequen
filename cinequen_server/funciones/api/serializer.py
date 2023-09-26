from rest_framework.serializers import ModelSerializer

from salas.api.serializer import SalaSerializer
from peliculas.api.serializer import PeliculaSerializer
from funciones.models import Funcion


class FuncionSerializer(ModelSerializer):
    sala_data = SalaSerializer(
        source='sala', read_only=True)
    pelicula_data = PeliculaSerializer(
        source='pelicula', read_only=True)

    class Meta:
        model = Funcion
        fields = [
            'id',
            'fecha',
            'hora_inicio',
            'hora_fin',
            'sala',
            'sala_data',
            'pelicula',
            'pelicula_data',
        ]
