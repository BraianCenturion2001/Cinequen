from django.db import models


class Sala(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    precio_entrada = models.IntegerField()
    activa = models.BooleanField(default=True)
    establecimiento = models.ForeignKey(
        'establecimientos.Establecimiento', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nombre
