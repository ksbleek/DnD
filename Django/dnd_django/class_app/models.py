from django.db import models

class player_classes(models.Model):
    name = models.CharField(max_length=100)
    health = models.IntegerField()
    

    def __str__(self):
        return self.name