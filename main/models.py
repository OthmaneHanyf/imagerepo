from django.db import models

class Photo(models.Model):
    image = models.ImageField(null=False, blank=False)

    def __str__(self):
        return str(self.pk)