from django_filters import rest_framework as filters
from peliculasxestablecimientos.models import PeliculaxEstablecimiento
from peliculas.models import Pelicula


class PeliculaFilter(filters.FilterSet):
    establecimiento__exclude = filters.NumberFilter(
        method='filter_establecimiento')

    def filter_establecimiento(self, queryset, name, value):
        peliculas_ids = PeliculaxEstablecimiento.objects.filter(
            establecimiento=value).values_list('pelicula_id', flat=True)
        peliculas_no_incluidas = Pelicula.objects.exclude(
            id__in=peliculas_ids)
        return peliculas_no_incluidas

    class Meta:
        model = Pelicula
        fields = [
            'establecimiento__exclude',
            'nombre',
            'duracion',
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
