from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    gender = models.CharField(max_length=10, default="Other")
    intro = models.CharField(max_length=200, default="这个人很懒，什么也没留下")
