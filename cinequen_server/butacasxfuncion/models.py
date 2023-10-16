from django.db import models


class ButacaxFuncion(models.Model):
    estado = models.IntegerField(default=0)
    butaca = models.ForeignKey(
        'butacas.Butaca', on_delete=models.SET_NULL, null=True, blank=True)
    funcion = models.ForeignKey(
        'funciones.Funcion', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return "Función: " + str(self.funcion) + " - Butaca: " + str(self.butaca) + " - Estado: " + str(self.estado)
