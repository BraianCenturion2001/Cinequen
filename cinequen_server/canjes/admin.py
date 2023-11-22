from django.contrib import admin
from canjes.models import Canje


@admin.register(Canje)
class CanjeAdmin(admin.ModelAdmin):
    pass
