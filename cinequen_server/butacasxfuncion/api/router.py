from rest_framework.routers import DefaultRouter
from butacasxfuncion.api.views import ButacaxFuncionApiViewSet

router_butacasxfuncion = DefaultRouter()

router_butacasxfuncion.register(
    prefix='butacasxfuncion', basename='butacasxfuncion', viewset=ButacaxFuncionApiViewSet
)
