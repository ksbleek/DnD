from django.urls import path
from .views import PartyListCreateView, PartyDetailView, PartyAddRemoveCharacterView

urlpatterns = [
    path('parties/', PartyListCreateView.as_view(), name='party-list-create'),
    path('parties/<int:pk>/', PartyDetailView.as_view(), name='party-detail'),
    path('parties/<int:pk>/add_character/', PartyAddRemoveCharacterView.as_view(), name='party-add-character', kwargs={'action': 'add'}),
    path('parties/<int:pk>/remove_character/', PartyAddRemoveCharacterView.as_view(), name='party-remove-character', kwargs={'action': 'remove'}),
]