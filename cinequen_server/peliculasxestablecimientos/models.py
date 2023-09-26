from django.db import models


class PeliculaxEstablecimiento(models.Model):
    activo = models.BooleanField(default=True)
    tipo = models.IntegerField(default=0)
    establecimiento = models.ForeignKey(
        'establecimientos.Establecimiento', on_delete=models.SET_NULL, null=True, blank=True)
    pelicula = models.ForeignKey(
        'peliculas.Pelicula', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return "Pelicula: " + str(self.pelicula) + " - Establecimiento: " + str(self.establecimiento) + " - Activo: " + str(self.activo)
