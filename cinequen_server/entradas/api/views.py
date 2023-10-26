from django.urls import path
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from entradas.models import Entrada
from entradas.api.serializer import EntradaClienteSerializer, EntradaSerializer, RegistroEntradaSerializer, EntradaCompletaSerializer
from entradas.api.filter import EntradaFilter

from butacasxfuncion.api.serializer import ButacaxFuncionSerializer
from butacasxfuncion.models import ButacaxFuncion
from users.models import Cliente

from rest_framework.response import Response
from rest_framework import status


class EntradaApiViewSet(ModelViewSet):
    permissions_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RegistroEntradaSerializer
        elif self.request.query_params.get('user'):
            return EntradaSerializer
        elif self.request.query_params.get('id'):
            return EntradaCompletaSerializer
        return EntradaClienteSerializer

    queryset = Entrada.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = EntradaFilter

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        entrada_data = serializer.data
        ids = instance.idsButacasxFuncion.split(',')
        butacas = ButacaxFuncion.objects.filter(id__in=ids)
        butacas_data = ButacaxFuncionSerializer(butacas, many=True).data
        entrada_data['butacas_data'] = butacas_data
        return Response(entrada_data)

    def perform_create(self, serializer):
        entrada = serializer.save()  # Guardar la nueva instancia de Entrada
        ids_butacas = entrada.idsButacasxFuncion.split(
            ',')  # Obtener los IDs de butacas

        # Actualizar el estado de las butacas
        for id_butaca in ids_butacas:
            try:
                butaca_x_funcion = ButacaxFuncion.objects.get(id=id_butaca)
                butaca_x_funcion.estado = 1  # Actualizar el estado a 1
                butaca_x_funcion.save()
            except ButacaxFuncion.DoesNotExist:
                # Manejar el caso de que no se encuentre la butaca por el ID
                pass

        # Sumar puntos al cliente
        cliente = Cliente.objects.get(user_id=entrada.user)
        # Obtener el valor del parámetro tipo_sala
        tipo_sala = self.request.data.get('tipo_sala')

        if tipo_sala == 'Sala Común':
            cliente.puntos += 100  # Sumar 5 puntos para sala1
        elif tipo_sala == 'Sala Midway':
            cliente.puntos += 250  # Sumar 10 puntos para sala2
        elif tipo_sala == 'Sala Centurión':
            cliente.puntos += 500  # Sumar 10 puntos para sala2
        else:
            cliente.puntos += 1000  # Sumar 1 punto para otros casos

        cliente.save()

        return Response(status=status.HTTP_201_CREATED)


""" shell
pip install reportlab django-qrcode
from django.http import HttpResponse
from django.template.loader import get_template
from django_qrcode.views import QRCodeView
from reportlab.pdfgen import canvas

def generate_pdf_with_qr(request, entrada_id):
    # Obtener la entrada según el ID
    entrada = Entrada.objects.get(id=entrada_id)

    # Generar el código QR
    qr_code = QRCodeView.as_view()(request, text=entrada_id)

    # Crear el PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="entrada.pdf"'

    p = canvas.Canvas(response)
    p.drawImage(qr_code, 100, 100, width=200, height=200)
    p.showPage()
    p.save()

    return response
urlpatterns = [
    # ...
    path('entradas/<int:entrada_id>/pdf/', generate_pdf_with_qr, name='pdf'),
    # ...
]
jsx
<a href="/api/entradas/1/pdf/">Descargar PDF</a> """
