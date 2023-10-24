from django.db import models


class Entrada(models.Model):
    estado = models.IntegerField(default=0)
    user = models.ForeignKey(
        'users.Cliente', on_delete=models.SET_NULL, null=True, blank=True)
    idsButacasxFuncion = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Estado: " + str(self.estado) + " - Cliente: " + str(self.user) + " - Butacas: " + str(self.idsButacasxFuncion)
