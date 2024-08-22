from rest_framework import serializers
from .models import Party
from character_app.serializers import CharacterSerializer

class PartySerializer(serializers.ModelSerializer):
    characters = CharacterSerializer(many=True, read_only=True)

    class Meta:
        model = Party
        fields = '__all__'

class PartyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = ['name']