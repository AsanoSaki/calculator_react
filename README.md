# Calculator React

## 1. 项目介绍

本项目前端界面基于 React 开发，各组件间的状态由 Redux 维护，通过 `npm` 部署并一键打包静态文件至后端，后端采用 Django 框架实现注册/登录/登出 API 接口，同时使用 Django 渲染前端界面，解决不同端口的跨域问题。

项目可以很轻易地部署至云服务器上。

Django 超级管理员账户：

 - 用户名：`admin`
 - 密码：`admin`

## 2. 环境要求

### 2.1 Python env

 - django 4.2.5：`pip install django`
 - django-cors-headers 4.2.0：`pip install django-cors-headers`

### 2.2 Node modules

 - 默认环境（创建 React 项目时产生）：`create-react-app calculator_react`
 - bootstrap 5.3.1：`npm i bootstrap`
 - jquery 3.7.1：`npm i jquery`
 - react-router-dom 18.2.0：`npm i react-router-dom`
 - redux 4.2.1 & react-redux 8.1.2 & @reduxjs/toolkit 1.9.5：`npm i redux react-redux @reduxjs/toolkit`

## 3. 启动相关服务

 - 创建 Python 虚拟环境：`python -m venv venv`
 - 启动 Python 虚拟环境：`.\venv\Scripts\Activate.ps1`
 - 启动 React 项目：`npm start`
 - 打包 React 项目：`npm run build`
 - 启动 Django 项目：`python manage.py runserver localhost:8000`
