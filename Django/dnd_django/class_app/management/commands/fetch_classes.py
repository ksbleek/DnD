import requests
from django.core.management.base import BaseCommand
from class_app.models import CharClass

class Command(BaseCommand):
    help = 'Fetch and save character classes from the D&D API'

    def handle(self, *args, **kwargs):
        class_ids = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard']
        base_url = 'https://www.dnd5eapi.co/api/classes/'

        for class_id in class_ids:
            response = requests.get(f'{base_url}{class_id}')
            if response.status_code == 200:
                data = response.json()
                name = data.get('name')
                health = data.get('hit_die')
                proficiencies = [prof['name'] for prof in data.get('proficiencies', [])]
                
                proficiency_choices_data = data.get('proficiency_choices', [])
                proficiency_choices = []
                if proficiency_choices_data:
                    choice = proficiency_choices_data[0]
                    proficiency_choices = {
                        'choose': choice.get('choose'),
                        'options': [option['item']['name'].replace('Skill: ', '') for option in choice.get('from', {}).get('options', []) if 'item' in option]
                    }
                
                saving_throws = [save['name'] for save in data.get('saving_throws', [])]

                CharClass.objects.update_or_create(
                    name=name,
                    defaults={
                        'health': health,
                        'proficiencies': proficiencies,
                        'proficiency_choices': proficiency_choices,
                        'saving_throws': saving_throws,
                    }
                )
                self.stdout.write(self.style.SUCCESS(f'Successfully saved class: {name}'))
            else:
                self.stdout.write(self.style.ERROR(f'Failed to fetch data for class: {class_id}'))
