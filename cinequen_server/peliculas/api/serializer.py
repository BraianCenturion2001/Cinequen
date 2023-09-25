from rest_framework.serializers import ModelSerializer
from peliculas.models import Pelicula


class PeliculaSerializer(ModelSerializer):
    class Meta:
        model = Pelicula
        fields = [
            'id',
            'nombre',
            'duracion',
            'poster',
            'video_trailer',
            'clasificacion',
            'actores',
            'director',
            'genero',
            'origen',
            'distribuidor',
            'descripcion_corta',
            'descripcion_larga',
            'tipo'
        ]
