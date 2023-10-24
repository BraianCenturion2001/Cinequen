from django.contrib import admin
from entradas.models import Entrada


@admin.register(Entrada)
class EntradaAdmin(admin.ModelAdmin):
    pass
