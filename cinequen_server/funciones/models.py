from django.db import models


class Funcion(models.Model):
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    sala = models.ForeignKey(
        'salas.Sala', on_delete=models.SET_NULL, null=True, blank=True)
    pelicula = models.ForeignKey(
        'peliculas.Pelicula', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return str(self.fecha.strftime("%d/%m/%Y")) + " - Sala: " + str(self.sala) + " - Película: " + str(self.pelicula)
