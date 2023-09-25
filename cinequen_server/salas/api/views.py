from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from salas.models import Sala
from salas.api.serializer import SalaSerializer


class SalaApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = SalaSerializer
    queryset = Sala.objects.all()