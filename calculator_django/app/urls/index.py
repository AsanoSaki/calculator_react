from django.urls import path, re_path
from app.views.login import mylogin
from app.views.logout import mylogout
from app.views.register import register
from app.views.getinfo import getinfo
from app.views.index import index
from app.views.runCode import runCode
from app.views.sendEmail import sendEmail
from app.views.update import update

urlpatterns = [
    path('login/', mylogin, name='login'),
    path('logout/', mylogout, name='logout'),
    path('register/', register, name='register'),
    path('getinfo/', getinfo, name='getinfo'),
    path('runcode/', runCode, name='runcode'),
    path('sendemail/', sendEmail, name='sendemail'),
    path('update/', update, name='update'),
    re_path('.*', index, name='index'),  # 正则匹配所有路径，除了上面几个路径之外均渲染Web页面
]
