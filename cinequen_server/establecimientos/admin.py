from django.contrib import admin
from establecimientos.models import Establecimiento


@admin.register(Establecimiento)
class EstablecimientoAdmin(admin.ModelAdmin):
    pass
