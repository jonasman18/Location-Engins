from django.contrib import admin

from django.urls import path, include

from django.conf import settings

from django.conf.urls.static import static


urlpatterns = [

    path('admin/', admin.site.urls),

    path('api/users/', include('users.urls')),

    path('api/', include('engins.urls')),

    path('api/', include('reservations.urls')),
    path('api/', include('locations.urls')),
    path('api/', include('detail_locations.urls')),
    path('api/', include('paiements.urls')),
    path('api/', include('factures.urls')),
    path('api/', include('recus.urls')),
    path('api/maintenances/', include('maintenances.urls')),
]

# gestion des fichiers media (images)

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)