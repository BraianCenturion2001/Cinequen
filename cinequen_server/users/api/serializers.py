from rest_framework import serializers
from users.models import User, Cliente


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'is_active',
            'is_staff',
            'rol'
        ]


class ClienteSerializer(serializers.ModelSerializer):
    user_data = UserSerializer(
        source='user', read_only=True)

    class Meta:
        model = Cliente
        fields = [
            'user_id',
            'nombre',
            'telefono',
            'puntos',
            'deshabilitado',
            'verificado',
            'user_data'
        ]


class RegistroSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
    rol = serializers.CharField()
    nombre = serializers.CharField()
    telefono = serializers.CharField()
