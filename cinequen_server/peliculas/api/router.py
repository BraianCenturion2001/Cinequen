from django.urls import path
from rest_framework.routers import DefaultRouter
from peliculas.api.views import PeliculaApiViewSet, BartsView, DonaView, LinesView

router_peliculas = DefaultRouter()

router_peliculas.register(
    prefix='peliculas', basename='peliculas', viewset=PeliculaApiViewSet
)

urlpatterns = [
    path('barts/', BartsView.as_view()),
    path('dona/', DonaView.as_view()),
    path('lines/', LinesView.as_view()),
]
