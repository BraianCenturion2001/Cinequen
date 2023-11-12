from django.contrib import admin
from productos_canje.models import ProductoCanje


@admin.register(ProductoCanje)
class ProductoCanjeAdmin(admin.ModelAdmin):
    pass
