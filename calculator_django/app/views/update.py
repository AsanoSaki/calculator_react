import re
from django.http import JsonResponse
from app.models.user import User

def update(request):
    user = request.user
    data = request.GET
    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    intro = data.get('intro', '').strip()
    gender = data.get('gender')

    if not intro:
        intro = '这个人很懒，什么也没留下'

    if not username:  # 用户名为空
        return JsonResponse({
            'result': 'Username can\'t be empty!',
        })
    elif username != user.username and User.objects.filter(username=username).exists():  # 用户名已存在且不是当前用户
        return JsonResponse({
            'result': 'Username has existed!'
        })

    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    if email and not re.fullmatch(regex, email):  # 正则表达式匹配验证邮箱格式是否正确，可以为空
        return JsonResponse({
            'result': 'Invalid email address format!'
        })

    user.username = username
    user.intro = intro
    user.email = email
    user.gender = gender
    user.save()

    return JsonResponse({
        'result': 'success',
    })
