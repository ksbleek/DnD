from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Party
from character_app.models import Character
from user_app.models import Player
from user_app.views import TokenReq
from .serializer import PartySerializer, PartyCreateSerializer

# Create your views here.
class PartyListCreateView(TokenReq):
    def get(self, request):
        parties = Party.objects.filter(player=request.user)
        serializer = PartySerializer(parties, many=True)
        return Response(serializer.data)

    def post(self, request):
            data = request.data.copy()
            serializer = PartyCreateSerializer(data=data)
            if serializer.is_valid():
                party = serializer.save(player=request.user)
                return Response(PartySerializer(party).data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PartyDetailView(TokenReq):
    def get_object(self, pk, user):
        try:
            return Party.objects.get(pk=pk, player=user)
        except Party.DoesNotExist:
            return None

    def get(self, request, pk):
        party = self.get_object(pk, request.user)
        if party is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PartySerializer(party)
        return Response(serializer.data)

    def put(self, request, pk):
        party = self.get_object(pk, request.user)
        if party is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PartyCreateSerializer(party, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        party = self.get_object(pk, request.user)
        if party is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        party.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PartyAddRemoveCharacterView(TokenReq):
    def post(self, request, pk, action=None):
        party = Party.objects.filter(pk=pk, player=request.user).first()
        if not party:
            return Response(status=status.HTTP_404_NOT_FOUND)

        character_id = request.data.get('character_id')
        try:
            character = Character.objects.get(id=character_id)
        except Character.DoesNotExist:
            return Response({'status': 'character not found'}, status=status.HTTP_404_NOT_FOUND)

        if action == 'add':
            if party.characters.count() < 4:
                party.characters.add(character)
                return Response({'status': 'character added'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'party is full'}, status=status.HTTP_400_BAD_REQUEST)
        elif action == 'remove':
            party.characters.remove(character)
            return Response({'status': 'character removed'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'invalid action'}, status=status.HTTP_400_BAD_REQUEST)