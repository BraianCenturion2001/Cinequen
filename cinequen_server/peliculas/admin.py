from django.contrib import admin
from peliculas.models import Pelicula


@admin.register(Pelicula)
class PeliculaAdmin(admin.ModelAdmin):
    pass
