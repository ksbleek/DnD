from rest_framework import serializers
from .models import Character
from race_app.models import race
from class_app.models import CharClass

class CharacterSerializer(serializers.ModelSerializer):
    race_name = serializers.CharField(source='race.name', read_only=True)
    char_class_name = serializers.CharField(source='char_class.name', read_only=True)
    race = serializers.SlugRelatedField(slug_field='name', queryset=race.objects.all(), write_only=True)
    char_class = serializers.SlugRelatedField(slug_field='name', queryset=CharClass.objects.all(), write_only=True)

    class Meta:
        model = Character
        fields = ['id', 'name', 'race', 'char_class', 'race_name', 'char_class_name', 'char_list']