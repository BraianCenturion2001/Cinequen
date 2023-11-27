from django.db import models
from datetime import datetime
import os


def get_file_path(instance, filename):
    ext = str(filename.split('.')[-1])
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    filename = "pelicula_{}.{}".format(timestamp, ext)
    return os.path.join('poster_peliculas/', filename)


class Pelicula(models.Model):
    nombre = models.CharField(max_length=100)
    duracion = models.IntegerField()
    poster = models.ImageField(upload_to=get_file_path, blank=True)
    video_trailer = models.CharField(max_length=100)
    clasificacion = models.CharField(max_length=100)
    actores = models.CharField(max_length=250)
    director = models.CharField(max_length=100)
    genero = models.CharField(max_length=100)
    origen = models.CharField(max_length=100)
    distribuidor = models.CharField(max_length=100)
    descripcion_corta = models.CharField(max_length=500)
    descripcion_larga = models.CharField(max_length=1500)
    tipo = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
