from rest_framework.routers import DefaultRouter

from .views import (
    CategorieViewSet,
    EnginViewSet
)

router = DefaultRouter()

router.register(
    'categories',
    CategorieViewSet
)

router.register(
    'engins',
    EnginViewSet
)

urlpatterns = router.urls