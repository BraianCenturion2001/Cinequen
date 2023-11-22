from rest_framework.routers import DefaultRouter
from canjes.api.views import CanjeApiViewSet

router_canjes = DefaultRouter()

router_canjes.register(
    prefix='canjes', basename='canjes', viewset=CanjeApiViewSet
)
