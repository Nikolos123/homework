from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import TodoFilter
from .serializers import ProjectSerializer, ToDoSerializer
from .models import Project, ToDo


class ProjectPagination(PageNumberPagination):
    page_size = 10


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    # pagination_class = ProjectPagination

    def get_queryset(self):
        queryset = Project.objects.all()
        name = self.request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__contains=name)
        return queryset


class ToDoPagination(PageNumberPagination):
    page_size = 20


class ToDoViewSet(ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()
    # pagination_class = ToDoPagination
    # filter_backends = [DjangoFilterBackend]
    filterset_class= TodoFilter

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.is_active = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)