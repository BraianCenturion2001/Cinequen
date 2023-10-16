from django_filters import rest_framework as filters
from butacasxfuncion.models import ButacaxFuncion


class ButacaxFuncionFilter(filters.FilterSet):

    class Meta:
        model = ButacaxFuncion
        fields = ['butaca', 'funcion', 'estado']
