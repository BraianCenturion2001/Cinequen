from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from users.models import User, Cliente
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from users.api.serializers import ClienteSerializer, UserSerializer, RegistroSerializer
from django.contrib.auth.hashers import make_password
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.exceptions import ValidationError


class UserApiViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        # Obtener el rol de la solicitud o el rol predeterminado
        rol = request.data.get('rol', User.DEFAULT_ROL)
        request.data['password'] = make_password(request.data['password'])
        if rol == 'CLIENTE':
            user_serializer = UserSerializer(data=request.data)
            cliente_serializer = ClienteSerializer(data=request.data)

            if user_serializer.is_valid() and cliente_serializer.is_valid():
                user = user_serializer.save()
                cliente = cliente_serializer.save(user=user)
                return Response(cliente_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif rol == 'ADMINISTRADOR':
            user_serializer = UserSerializer(data=request.data)

            if user_serializer.is_valid():
                user = user_serializer.save()
                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"rol": ["El rol especificado no es válido."]}, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        password = request.data['password']
        if password:
            request.data['password'] = make_password(password)
        else:
            request.data['password'] = request.user.password
        return super().update(request, *args, **kwargs)


class RegistroView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=RegistroSerializer,
        responses={200: openapi.Response('OK'), 400: 'Bad Request'}
    )
    def post(self, request):
        # Verificar que el campo 'rol' sea igual a 'CLIENTE'
        if request.data.get('rol') != 'CLIENTE':
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # Validar los datos del usuario y el cliente
        user_serializer = UserSerializer(data=request.data)
        cliente_serializer = ClienteSerializer(data=request.data)
        if user_serializer.is_valid() and cliente_serializer.is_valid():
            # Crear el usuario y el cliente
            user = user_serializer.save(
                password=make_password(request.data['password']))
            cliente = cliente_serializer.save(user=user)
            # Construir la URL para el enlace en el correo electrónico
            url = 'http://localhost:3000/register'

            # Construir el contenido del correo electrónico con la URL
            contenido = f'Hola {cliente.nombre}, gracias por registrarte. Haz clic en el siguiente enlace para activar tu cuenta: {url}'
            print("Correo: ", user.email)
            # Enviar el correo electrónico
            send_mail(
                'Activación de cuenta',
                contenido,
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )

            return Response(status=status.HTTP_201_CREATED)
        else:
            # Devolver los errores de validación
            errors = {}
            if not user_serializer.is_valid():
                errors.update(user_serializer.errors)
            if not cliente_serializer.is_valid():
                errors.update(cliente_serializer.errors)
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.rol == 'CLIENTE':
            cliente = Cliente.objects.get(user=user)
            serializer = ClienteSerializer(cliente)
        elif user.rol == 'ADMINISTRADOR':
            # Si es un administrador, usa el UserSerializer
            user = User.objects.get(pk=user.pk)
            serializer = UserSerializer(user)
        return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get("email")
        user = User.objects.get(email=email)
        if user.rol == 'CLIENTE':
            cliente = Cliente.objects.get(user=user)
            if not cliente.verificado:
                raise ValidationError("El cliente no está verificado")

        return super().validate(attrs)


class LoginTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
