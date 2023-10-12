from django.db import models


class Butaca(models.Model):
    fila = models.CharField(max_length=1)
    numero = models.IntegerField()
    sala = models.ForeignKey(
        'salas.Sala', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.fila} - {self.numero} | {self.sala}"
