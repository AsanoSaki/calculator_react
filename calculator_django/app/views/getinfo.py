from django.http import JsonResponse
from datetime import datetime

def getinfo(request):
    user = request.user
    if not user.is_authenticated:  # 用户未登录
        return JsonResponse({
            'result': 'not login',
        })
    else:
        return JsonResponse({
            'result': 'success',
            'username': user.username,
            'email': user.email,
            'intro': user.intro,
            'date_joined': user.date_joined.strftime('%Y-%m-%d'),
            'gender': user.gender,
        })
