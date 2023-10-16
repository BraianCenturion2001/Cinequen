from django.contrib import admin
from butacasxfuncion.models import ButacaxFuncion


@admin.register(ButacaxFuncion)
class ButacaxFuncionAdmin(admin.ModelAdmin):
    pass
