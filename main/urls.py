
from django.urls import path
from django.urls.conf import include
from . import views

urlpatterns = [
    path('photos', views.get_photos, name='photos'),
    path('photos/upload', views.upload_photo, name='upload'),
    path('photos/delete/<int:pk>', views.delete_photo, name='delete'),
]