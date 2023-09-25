from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from establecimientos.models import Establecimiento
from establecimientos.api.serializer import EstablecimientoSerializer


class EstablecimientoApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = EstablecimientoSerializer
    queryset = Establecimiento.objects.all
