from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=255, null=True)
    description = models.CharField(max_length=1000, null=True)
    date = models.CharField(max_length=255, null=True)
    time = models.CharField(max_length=255, null=True)
    photo = models.CharField(max_length=1000, null=True)

