import requests
from django.core.management.base import BaseCommand
from race_app.models import race

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        race_ids = ['dragonborn', 'dwarf', 'elf', 'gnome', 'half-elf', 'halfling', 'half-orc', 'human', 'tiefling']
        base_url = 'https://www.dnd5eapi.co/api/races/'

        for race_id in race_ids:
            response = requests.get(f'{base_url}{race_id}')
            if response.status_code == 200:
                data = response.json()
                name = data.get('name')
                desc = data.get('age')
                ability_scores = data.get('ability_bonuses')

                race.objects.update_or_create(
                    name=name,
                    defaults={
                        'desc': desc,
                        'ability_scores': ability_scores,
                    }
                )
                self.stdout.write(self.style.SUCCESS(f'Successfully saved race: {name}'))
            else:
                self.stdout.write(self.style.ERROR(f'Failed to fetch data for race: {race_id}'))
