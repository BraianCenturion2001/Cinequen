from django.contrib import admin
from funciones.models import Funcion


@admin.register(Funcion)
class FuncionAdmin(admin.ModelAdmin):
    pass
