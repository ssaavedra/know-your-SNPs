from django.conf import settings
from django.db import models


class OwningQuerySet(models.QuerySet):
    def for_owner(self, user=None):
        if not user.is_authenticated():
            user = None

        owner_field = 'owner'
        if hasattr(self.model, 'OWNER_FIELD'):
            owner_field = self.model.OWNER_FIELD
        return self.filter(**{owner_field: user})


class Specimen(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL)
    txtfile = models.FileField(upload_to='originals/')
    jsonfile = models.FileField(upload_to='json/')

    objects = OwningQuerySet.as_manager()


class KnownMutation(models.Model):
    name = models.CharField(max_length=50)
    genotype = models.CharField(max_length=2)
    short_description = models.CharField(max_length=280)
    long_description = models.TextField()
