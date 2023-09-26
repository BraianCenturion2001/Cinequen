from django.contrib import admin
from peliculasxestablecimientos.models import PeliculaxEstablecimiento


@admin.register(PeliculaxEstablecimiento)
class PeliculaxEstablecimientoAdmin(admin.ModelAdmin):
    pass
