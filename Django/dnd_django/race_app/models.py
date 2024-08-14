from django.db import models

class race(models.Model):
    name = models.CharField(max_length=100)
    desc = models.TextField()
    ability_scores = models.JSONField()

    def __str__(self):
        return self.name