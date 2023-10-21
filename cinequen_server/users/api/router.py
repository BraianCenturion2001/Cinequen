from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.api.views import UserApiViewSet, UserView, RegistroView

router_user = DefaultRouter()

router_user.register(
    prefix='users', basename='users', viewset=UserApiViewSet
)

urlpatterns = [
    path('auth/login/', TokenObtainPairView.as_view(),
         name='admin_token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(),
         name='admin_token_refresh'),
    path('auth/me/', UserView.as_view()),
    path('auth/register/', RegistroView.as_view())
]
