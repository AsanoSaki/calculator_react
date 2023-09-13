from django.http import JsonResponse

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
        })
