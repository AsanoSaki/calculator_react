import os
import time
import psutil
import subprocess
from django.http import JsonResponse
from concurrent.futures import ThreadPoolExecutor

def getInfo(pid):
    p = psutil.Process(pid)  # 获取ID=pid的子进程
    cputime = time.time()
    memory = 0
    while(True):
        try:
            memory = max(memory, p.memory_info().rss)
        except:
            break
    cputime = (time.time() - cputime) * 1000
    return cputime, memory

def runCPP(value, code_input):
    SrcFile = open('test.cpp', 'w')  # 创建一个临时文件
    SrcFile.write(value)
    SrcFile.close()

    res = {
        'status': None,
        'memory': None,
        'cputime': None,
        'output': None,
        'error': None
    }
    args = ['g++', '-std=c++11', 'test.cpp', '-o', 'test.run']

    ret = subprocess.run(  # 执行args中的指令，即编译文件
        args=args,
        capture_output=True,  # 捕获stdout和stderr
        encoding='utf-8'
    )
    if(ret.returncode == 0):  # subprocess子进程运行正常，即编译成功
        proc = subprocess.Popen(  # 创建子进程
            args='./' + 'test.run',
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            encoding='utf-8',
        )
        # submit函数来提交线程需要执行的任务（函数名和参数）到线程池中，并返回该任务的句柄
        thread = ThreadPoolExecutor().submit(getInfo, proc.pid)  # 第一个是回调函数，第二个是传给函数的参数
        try:
            res['output'], res['error'] = proc.communicate(input=code_input, timeout=1)  # 和子进程交互，发送和读取数据
            res['cputime'], res['memory'] = thread.result()
            res['status'] = 'Success'
        except subprocess.CalledProcessError:
            res['status'] = 'Runtime Error'
        except subprocess.TimeoutExpired:
            res['status'] = 'Time Limit Exceeded'
        proc.kill()
        proc.communicate()
        res['cputime'], res['memory'] = thread.result()
    else:  # 编译错误
        res['status'] = 'Compile Error'
        res['error'] = ret.stderr  # 获得stderr的错误信息
    try:  # 删除创建出来的临时文件
        os.remove('test.cpp')
        os.remove('test.run')
    except:
        pass
    return JsonResponse(res)

def runPython(value, code_input):
    SrcFile = open('test.py', 'w')
    SrcFile.write(value)
    SrcFile.close()

    res = {
        'status': None,
        'memory': None,
        'cputime': None,
        'output': None,
        'error': None
    }

    proc = subprocess.Popen(  # Python不需要编译，直接创建子进程运行即可
        args=['python', './' + 'test.py'],  # 如果部署至Linux，需要将python改为python3
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        encoding='utf-8',
    )
    thread = ThreadPoolExecutor().submit(getInfo, proc.pid)
    try:
        res['output'], res['error'] = proc.communicate(input=code_input, timeout=1)
        res['cputime'], res['memory'] = thread.result()
        res['status'] = 'Success'
    except subprocess.CalledProcessError:
        res['status'] = 'Runtime Error'
    except subprocess.TimeoutExpired:
        res['status'] = 'Time Limit Exceeded'
    proc.kill()
    proc.communicate()
    res['cputime'], res['memory'] = thread.result()
    try:
        os.remove('test.py')
    except:
        pass
    return JsonResponse(res)

def runCode(request):
    data = request.GET
    value = data.get('value')
    language = data.get('language')
    code_input = data.get('code_input')
    if (language == 'cpp'):
        return runCPP(value=value, code_input=code_input)
    elif (language == 'python'):
        return runPython(value=value, code_input=code_input)
    return JsonResponse({
        'status': f'Failed! The language({language}) you have selected has not complete!',
    })
