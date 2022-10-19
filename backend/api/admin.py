from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import user


class user_admin(UserAdmin):
    list_display = ('email', 'name', 'passWrongCount', 'date_joined', 'last_login',)
    search_fields = ('email', 'name')
    readonly_fields=('date_joined', 'last_login')
    ordering = ('email', 'name',)
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    add_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': ('email', 'password1', 'password2'),
    }),
)


admin.site.register(user, user_admin)
