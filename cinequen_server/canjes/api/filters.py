from django_filters import rest_framework as filters
from canjes.models import Canje


class CanjeFilter(filters.FilterSet):

    class Meta:
        model = Canje
        fields = ['fecha', 'puntos_restados', 'cliente', 'producto']
