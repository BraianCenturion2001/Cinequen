from django.db import models
from datetime import datetime
import os


def get_file_path(instance, filename):
    ext = str(filename.split('.')[-1])
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    filename = "productoCanje_{}.{}".format(timestamp, ext)
    return os.path.join('productos_canje/', filename)


class ProductoCanje(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to=get_file_path, blank=True)
    descripcion = models.CharField(max_length=500)
    precio_puntos = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.nombre
