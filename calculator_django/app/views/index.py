from django.shortcuts import render

def index(request):
    return render(request, 'index.html');  # Django默认会从templates开始找HTML