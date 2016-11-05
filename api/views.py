
from django.contrib.auth import get_user_model
from rest_framework.permissions import (IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from . import filters, models, serializers, utils


class UserViewSet(ModelViewSet):
    queryset = get_user_model().objects.all()

    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = serializers.UserSerializer


class MutationViewSet(ReadOnlyModelViewSet):
    queryset = models.KnownMutation.objects.all()

    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.MutationSerializer


class SpecimenViewSet(ModelViewSet):
    queryset = models.Specimen.objects.all()

    filter_backends = (filters.IsOwnerFilterBackend,)
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = serializers.SpecimenSerializer

    def get_serializer_class(self):
        if self.request.method.lower() in ['put', 'post', 'patch']:
            # Uploading a specimen. We only want the txtfile and we'll
            # generate the others.
            return serializers.SpecimenCreateSerializer
        else:
            return self.serializer_class

    def perform_create(self, serializer):
        serializer.initial_data['owner'] = self.request.user
        serializer.initial_data['jsonfile'] = \
            utils.create_json_from_txt(serializer.initial_data['txtfile'])
        raise Exception('Do not really create the object')
