from django.db import models
from user_app.models import Player
from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist
from race_app.models import race


# Create your models here.
class Characters_list(models.Model):
    player = models.OneToOneField(Player, null=False, on_delete=models.CASCADE)


def get_default_characters_list():
    Characters_list = apps.get_model('character_app', 'Characters_list')
    try:
        default_list, created = Characters_list.objects.get_or_create(player_id=1)  # Adjust player_id as needed
        return default_list.id
    except ObjectDoesNotExist:
        return None

class Character(models.Model):
    name = models.CharField(max_length=255)
    race = models.OneToOneField(race, null=True, on_delete=models.CASCADE)
    char_class = models.CharField(max_length=255)
    char_list = models.ForeignKey(Characters_list, default=get_default_characters_list, null=False, on_delete=models.CASCADE, related_name='characters')
