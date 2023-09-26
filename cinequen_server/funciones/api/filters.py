from django_filters import rest_framework as filters
from funciones.models import Funcion


class FuncionFilter(filters.FilterSet):
    fecha__gte = filters.DateFilter(field_name='fecha', lookup_expr='gte')
    sala__establecimiento = filters.NumberFilter(
        field_name='sala__establecimiento', lookup_expr='exact')

    class Meta:
        model = Funcion
        fields = ['fecha__gte', 'sala',
                  'sala__establecimiento', 'pelicula', 'fecha']
