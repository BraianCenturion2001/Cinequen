from django.db import models


class ProductoCanje(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='productos_canje')
    descripcion = models.CharField(max_length=500)
    precio_puntos = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.nombre
