import React, { Component } from 'react';
import Card from './card';

class Home extends Component {
    state = {  }
    render() {
        return (
            <Card>
                <h3>Home</h3>
                <hr />
                <p>本项目为基于 React 与 Django 开发的在线计算器以及代码编译器~</p>
                <p>代码编译器由 CodeMirror 插件支持，目前支持的语言为：C++、Python</p>
                <p>项目前端页面组件来源于 Bootstrap</p>
                <p>用户反馈邮件使用 SMTP 协议进行匿名发送</p>
                <p>注册并登录后即可访问计算器与编译器页面~</p>
                <p>可以根据导航栏的指引跳转至相应的页面~</p>
                <p>更多功能页面尚待开发中~</p>
            </Card>
        );
    }
}

export default Home;