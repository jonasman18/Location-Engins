from rest_framework.routers import DefaultRouter

from .views import DetailLocationViewSet


router = DefaultRouter()

router.register(
    'detail-locations',
    DetailLocationViewSet
)

urlpatterns = router.urls