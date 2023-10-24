from django_filters import rest_framework as filters
from entradas.models import Entrada


class EntradaFilter(filters.FilterSet):

    class Meta:
        model = Entrada
        fields = ['estado', 'user', 'created_at', 'updated_at']
