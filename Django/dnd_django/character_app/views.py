from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Character, Characters_list
from .serializers import CharacterSerializer
from user_app.views import TokenReq
from race_app.models import race
from class_app.models import CharClass

class CharacterListCreateView(TokenReq):
    def get(self, request):
        characters = Character.objects.filter(char_list__player=request.user)
        serializer = CharacterSerializer(characters, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Ensure the Characters_list exists
        characters_list, created = Characters_list.objects.get_or_create(player=request.user)
        print(f"Characters_list: {characters_list}, Created: {created}")
    
        # Set the char_list field to the primary key of the Characters_list instance
        data = request.data.copy()
        data['char_list'] = characters_list.id
        print(f"Request Data: {data}")
    
        serializer = CharacterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(f"Serializer Errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CharacterDetailView(TokenReq):
    def get_object(self, pk, user):
        try:
            return Character.objects.get(pk=pk, char_list__player=user)
        except Character.DoesNotExist:
            return None

    def get(self, request, pk):
        character = self.get_object(pk, request.user)
        if character is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = CharacterSerializer(character)
        return Response(serializer.data)

    def put(self, request, pk):
        character = self.get_object(pk, request.user)
        if character is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        name = request.data.get('name', None)
        if name is None:
            return Response({"error": "Name field is required."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = CharacterSerializer(character, data={'name': name}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        character = self.get_object(pk, request.user)
        if character is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        character.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
