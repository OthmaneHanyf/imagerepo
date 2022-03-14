from django.db import models

class Photo(models.Model):
    image = models.ImageField(null=False, blank=False)
    title = models.CharField(max_length=32, null=False, blank=False)
    description = models.TextField(null=False, blank=False)

    def __str__(self):
        return str(self.pk)