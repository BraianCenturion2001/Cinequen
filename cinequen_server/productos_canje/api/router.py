from rest_framework.routers import DefaultRouter
from productos_canje.api.views import ProductoCanjeApiViewSet

router_productos_canje = DefaultRouter()

router_productos_canje.register(
    prefix='productos_canje', basename='productos_canje', viewset=ProductoCanjeApiViewSet
)
