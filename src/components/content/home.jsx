import React, { Component } from 'react';
import Card from './card';

class Home extends Component {
    state = {  }
    render() {
        return (
            <Card>
                <h3>Home</h3>
                <hr />
                <p>本项目为基于 React 与 Django 开发的在线计算器~</p>
                <p>注册并登录后即可访问计算器页面~</p>
                <p>可以根据导航栏的指引跳转至相应的页面~</p>
                <p>更多功能页面尚待开发中~</p>
            </Card>
        );
    }
}

export default Home;