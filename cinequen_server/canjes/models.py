from django.db import models


class Canje(models.Model):
    fecha = models.DateField()
    puntos_restados = models.IntegerField()
    cliente = models.ForeignKey(
        'users.Cliente', on_delete=models.SET_NULL, null=True, blank=True)
    producto = models.ForeignKey(
        'productos_canje.ProductoCanje', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return "Cliente: " + str(self.cliente) + " - Producto: " + str(self.producto)
