from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from productos_canje.models import ProductoCanje
from productos_canje.api.filters import ProductoCanjeFilter
from productos_canje.api.serializer import ProductoCanjeSerializer


class ProductoCanjeApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProductoCanjeSerializer
    queryset = ProductoCanje.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductoCanjeFilter
