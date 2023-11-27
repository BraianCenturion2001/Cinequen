from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from peliculas.models import Pelicula
from funciones.models import Funcion
from butacasxfuncion.models import ButacaxFuncion
from peliculas.api.serializer import PeliculaSerializer
from peliculas.api.filter import PeliculaFilter


class PeliculaApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PeliculaSerializer
    queryset = Pelicula.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = PeliculaFilter


class BartsView(APIView):

    def get(self, request):
        peliculas = Pelicula.objects.all()
        series=[]
        taquilla_anual = [
            {
                'month': 'Jan',
            },
            {
                'month': 'Fev',
            },
            {
                'month': 'Mar',
            },
            {
                'month': 'Apr',
            },
            {
                'month': 'May',
            },
            {
                'month': 'June',
            },
            {
                'month': 'July',
            },
            {
                'month': 'Aug',
            },
            {
                'month': 'Sept',
            },
            {
                'month': 'Oct',
            },
            {
                'month': 'Nov',
            },
            {
                'month': 'Dec',
            },
        ]

        for pelicula in peliculas:
            series.append({'dataKey': pelicula.nombre, 'label':pelicula.nombre})
            for mes in range(1, 13):
                entradas_por_mes = get_entradas_vendidas_por_pelicula(
                    pelicula, mes
                )
                taquilla_anual[mes - 1][pelicula.nombre] = entradas_por_mes
               

        return Response({'taquilla': taquilla_anual, 'series': series})

class DonaView(APIView):

    def get(self, request):
        peliculas = Pelicula.objects.all()
        series=[]
        
        for pelicula in peliculas:
            entradas = get_entradas_vendidas_por_pelicula(
                pelicula
            )
            series.append({'label':pelicula.nombre, 'value': entradas})
               

        return Response(series)
    
class LinesView(APIView):

    def get(self, request):
        series=[]
        for mes in range(1, 13):
            entradas = 0;
            funciones = Funcion.objects.filter(fecha__month=mes)
            for funcion in funciones:
                entradas += ButacaxFuncion.objects.filter(
                    funcion=funcion, estado=True
                ).count()
            series.append(entradas)
        return Response(series)


def get_entradas_vendidas_por_pelicula(pelicula, mes=None):
    funciones = Funcion.objects.filter(pelicula=pelicula)
    if mes is not None:
        funciones = funciones.filter(fecha__month=mes)
    entradas = 0
    for funcion in funciones:
        entradas += ButacaxFuncion.objects.filter(
            funcion=funcion, estado=True
        ).count()
    return entradas

