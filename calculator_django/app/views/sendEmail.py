from django.http import JsonResponse
from django.core import mail
from django.conf import settings

def sendEmail(request):
    data = request.GET
    message = data.get('message', '').strip()  # 如果没有的话返回空，且过滤掉空格

    if message:
        mail.send_mail(
            subject='在线计算器与编译器项目用户反馈',  # 题目
            message=message,  # 消息内容
            from_email=settings.EMAIL_HOST_USER,  # 发送者
            recipient_list=settings.RECIPIENT_ADDRESS,  # 接收者邮件列表
        )

    return JsonResponse({
        'result': 'success',
    })
