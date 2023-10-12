from django.contrib import admin
from butacas.models import Butaca


@admin.register(Butaca)
class ButacaAdmin(admin.ModelAdmin):
    pass
