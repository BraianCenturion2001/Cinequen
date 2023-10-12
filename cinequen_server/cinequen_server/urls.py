from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

from users.api.router import router_user
from peliculas.api.router import router_peliculas
from establecimientos.api.router import router_establecimientos
from salas.api.router import router_salas
from funciones.api.router import router_funciones
from peliculasxestablecimientos.api.router import router_peliculasxestablecimientos
from butacas.api.router import router_butacas

schema_view = get_schema_view(
    openapi.Info(
        title="Cinequén - ApiDoc",
        default_version='v1',
        description="Documentación de la API de Cinequén",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="braiankrayan@hotmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redocs/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
    path('api/', include('users.api.router')),
    path('api/', include(router_user.urls)),
    path('api/', include(router_peliculas.urls)),
    path('api/', include(router_establecimientos.urls)),
    path('api/', include(router_salas.urls)),
    path('api/', include(router_funciones.urls)),
    path('api/', include(router_peliculasxestablecimientos.urls)),
    path('api/', include(router_butacas.urls)),
]

# Configura el acceso a las imágenes
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
