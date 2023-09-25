from django.db import models
from establecimientos.models import Establecimiento


class Sala(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    precio_entrada = models.IntegerField()
    idEstablecimiento = models.ForeignKey(
        Establecimiento, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
