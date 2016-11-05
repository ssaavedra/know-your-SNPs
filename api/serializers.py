from django.contrib.auth import get_user_model
from rest_framework.serializers import HyperlinkedModelSerializer

from . import models


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('url', 'username')


class MutationSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = models.KnownMutation
        fields = '__all__'


class SpecimenCreateSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = models.Specimen
        fields = ('txtfile',)


class SpecimenSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = models.Specimen
        fields = '__all__'
