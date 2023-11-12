from django_filters import rest_framework as filters
from productos_canje.models import ProductoCanje


class ProductoCanjeFilter(filters.FilterSet):
    stock_gt = filters.NumberFilter(field_name='stock', lookup_expr='gt')

    class Meta:
        model = ProductoCanje
        fields = ['nombre', 'tipo', 'descripcion', 'stock', 'stock_gt']
