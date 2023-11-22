from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from canjes.models import Canje
from canjes.api.filters import CanjeFilter
from canjes.api.serializer import CanjeCompletoSerializer, CanjeSimpleSerializer, CanjeProductoSerializer


class CanjeApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CanjeCompletoSerializer
    queryset = Canje.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = CanjeFilter

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CanjeSimpleSerializer
        elif self.request.query_params.get('cliente') is not None:
            return CanjeProductoSerializer
        return CanjeCompletoSerializer
