from django.db import models


class Establecimiento(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=100)
    ciudad = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    horario_apertura = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
