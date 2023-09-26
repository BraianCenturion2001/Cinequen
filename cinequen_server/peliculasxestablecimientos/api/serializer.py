from rest_framework.serializers import ModelSerializer

from establecimientos.api.serializer import EstablecimientoSerializer
from peliculas.api.serializer import PeliculaSerializer
from peliculasxestablecimientos.models import PeliculaxEstablecimiento


class PeliculaxEstablecimientoSerializer(ModelSerializer):
    establecimiento_data = EstablecimientoSerializer(
        source='establecimiento', read_only=True)
    pelicula_data = PeliculaSerializer(
        source='pelicula', read_only=True)

    class Meta:
        model = PeliculaxEstablecimiento
        fields = [
            'id',
            'activo',
            'tipo',
            'establecimiento',
            'establecimiento_data',
            'pelicula',
            'pelicula_data',
        ]
