from django.contrib.auth.hashers import make_password
from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import (
    BaseUserManager, AbstractUser
)
from django.contrib.auth.models import Group

class MyUserManager(BaseUserManager):
    def create_user(self, email, phone, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, phone, password, **extra_fields)

class EmailConfig(models.Model):
    from_email = models.EmailField(max_length=100)
    email_password = models.CharField(
        max_length=128, validators=[MinLengthValidator(8)])
    email_host = models.CharField(max_length=50, default="mail.tdbsoft.co.ke")
    email_port = models.CharField(max_length=5, default=465)
    use_tls = models.BooleanField(default=True)
    fail_silently = models.BooleanField(default=True)

    # def save(self, *args, **kwargs):
    #     self.email_password = make_password(self.email_password)
    #     super(EmailConfig, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return self.from_email

    class Meta:
        verbose_name_plural = 'Email Configuration'


class MyUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email Address',
        max_length=100,
        unique=True,
    )
    phone = models.CharField(max_length=15)
    pic = models.ImageField(
        upload_to='user/profile/images', blank=True, null=True)
    organisation = models.CharField(
        max_length=255, default='TDBSoft', blank=True, null=True)
    is_active = models.BooleanField(default=False)
    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone', 'first_name',
                       'last_name']

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(MyUser, self).save(*args, **kwargs)

    def __str__(self):
        return self.email
