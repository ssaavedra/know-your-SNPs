from rest_framework import permissions


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_superuser:
            return True

        if hasattr(obj, 'is_owner') and obj.is_owner(request.user):
            return True

        return False
