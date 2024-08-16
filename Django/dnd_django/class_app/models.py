from django.db import models

class CharClass(models.Model):
    name = models.CharField(max_length=100)
    health = models.IntegerField()
    proficiencies = models.JSONField()
    proficiency_choices = models.JSONField()
    saving_throws = models.JSONField()

    def __str__(self):
        return self.name
