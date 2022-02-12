from mixer.backend.django import mixer
from django.core.management.base import BaseCommand

from todoapp.models import Project,ToDo


class Command(BaseCommand):
    help = 'Create project and todo'


    def handle(self, *args, **options):
       for i in range(5):
           mixer.blend(Project)
           mixer.blend(ToDo)
       print('done')
