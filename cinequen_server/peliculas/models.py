from django.db import models


class Pelicula(models.Model):
    nombre = models.CharField(max_length=100)
    duracion = models.IntegerField()
    poster = models.ImageField(upload_to='poster_peliculas')
    video_trailer = models.CharField(max_length=100)
    clasificacion = models.CharField(max_length=100)
    actores = models.CharField(max_length=250)
    director = models.CharField(max_length=100)
    genero = models.CharField(max_length=100)
    origen = models.CharField(max_length=100)
    distribuidor = models.CharField(max_length=100)
    descripcion_corta = models.CharField(max_length=250)
    descripcion_larga = models.CharField(max_length=500)
    tipo = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
