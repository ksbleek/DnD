from django.db import models
from user_app.models import Player
from character_app.models import Character

# Create your models here.
class Party(models.Model):
    name = models.CharField(max_length=255)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    characters = models.ManyToManyField(Character, related_name='parties')
