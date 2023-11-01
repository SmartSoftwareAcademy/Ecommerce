from django.contrib.auth.hashers import make_password
from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import (
    BaseUserManager, AbstractUser
)
from django.contrib.auth.models import Group


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

class MyUserManager(BaseUserManager):
    def create_user(self, email, phone, password='@User123', **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class MyUser(AbstractUser):
    GENDER = [("Male", "Male"), ("Female", "Female"), ("Other", "Other")]
    email = models.EmailField(
        verbose_name='Email Address',
        max_length=100,
        unique=True,
    )
    phone = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER,default='Other')
    pic = models.ImageField(
        upload_to='user/profile/images', blank=True, null=True)
    organisation = models.CharField(
        max_length=255, default='TDBSoft', blank=True, null=True)
    ip_address=models.CharField(max_length=100,default="192.168.0.1")
    device=models.CharField(max_length=100,default="Phone")
    is_active = models.BooleanField(default=False)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['phone', 'first_name',
                       'last_name']
    objects = MyUserManager()


    def save(self, *args, **kwargs):
        #self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
