from django_filters import rest_framework as filters
from peliculasxestablecimientos.models import PeliculaxEstablecimiento


class PeliculaxEstablecimientoFilter(filters.FilterSet):
    establecimiento__exclude = filters.NumberFilter(
        method='filter_establecimiento')

    def filter_establecimiento(self, queryset, name, value):
        peliculas_establecimiento = PeliculaxEstablecimiento.objects.filter(
            establecimiento=value).values_list('pelicula', flat=True)
        return queryset.exclude(pelicula__in=peliculas_establecimiento)

    class Meta:
        model = PeliculaxEstablecimiento
        fields = ['establecimiento__exclude',
                  'establecimiento', 'pelicula', 'activo', 'tipo']
