from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROL_CHOICES = (
        ('CLIENTE', 'Cliente'),
        ('ADMINISTRADOR', 'Administrador'),
    )
    DEFAULT_ROL = 'ADMINISTRADOR'

    rol = models.CharField(
        max_length=20, choices=ROL_CHOICES, default=DEFAULT_ROL)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Cliente(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    deshabilitado = models.BooleanField(default=False)
    verificado = models.BooleanField(default=False)
    puntos = models.IntegerField(default=0)
