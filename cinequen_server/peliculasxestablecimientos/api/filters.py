from django_filters import rest_framework as filters
from peliculasxestablecimientos.models import PeliculaxEstablecimiento


class PeliculaxEstablecimientoFilter(filters.FilterSet):

    class Meta:
        model = PeliculaxEstablecimiento
        fields = ['establecimiento', 'pelicula', 'activo', 'tipo']
