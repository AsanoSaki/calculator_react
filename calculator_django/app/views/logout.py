from django.contrib.auth import logout
from django.http import JsonResponse

def mylogout(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            'result': 'success',
        })
    logout(request)
    return JsonResponse({
        'result': 'success',
    })
