from rest_framework.routers import DefaultRouter
from butacas.api.views import ButacaApiViewSet

router_butacas = DefaultRouter()

router_butacas.register(
    prefix='butacas', basename='butacas', viewset=ButacaApiViewSet
)
