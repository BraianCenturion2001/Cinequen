from django.db import models


class Funcion(models.Model):
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    formato = models.CharField(max_length=25, default='N/A')
    idioma = models.CharField(max_length=25, default='N/A')
    sala = models.ForeignKey(
        'salas.Sala', on_delete=models.SET_NULL, null=True, blank=True)
    pelicula = models.ForeignKey(
        'peliculas.Pelicula', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return str(self.fecha.strftime("%d/%m/%Y")) + " - Sala: " + str(self.sala) + " - Establecimiento: " + str(self.sala.establecimiento) + " - Película: " + str(self.pelicula)
