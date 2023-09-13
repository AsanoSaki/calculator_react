from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def mylogin(request):
    data = request.GET
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username=username, password=password)
    if not user:
        return JsonResponse({
            'result': 'Username or password wrong!',

        })
    login(request, user)
    return JsonResponse({
        'result': 'success',
    })
