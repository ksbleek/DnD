from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.contrib.auth import login, logout, authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token

from .models import Player

# Create your views here.
class Sign_Up(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("email")

        try:
            # Use the create_user method to create a new user
            new_user = Player.objects.create_user(
                email=data['email'],
                password=data['password'],
                username=data['username']
            )

            # Create a token for the new user
            token = Token.objects.create(user=new_user)
            login(request, new_user)

            response_data = {"player": new_user.email, "token": token.key}
            return Response(response_data, status=HTTP_201_CREATED)
        except ValidationError as e:
            print(e.message_dict)  # Corrected print statement
            return Response({'error': e.message_dict}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Catch any other exceptions and return a generic error message
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("email")

        user = authenticate(username=data.get('username'), password=data.get('password'))
        print(user)

        if user:
            login(request, user)

            token, created = Token.objects.get_or_create(user=user)

            response_data = {"player": user.email, "token": token.key}
            return Response(response_data, status=HTTP_200_OK)
        
        return Response("Invalid login credentials", status=HTTP_400_BAD_REQUEST)
    
class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)
    
class Info(TokenReq):
    def get(self, request):
        return Response({
            "email": request.user.email,
            })
