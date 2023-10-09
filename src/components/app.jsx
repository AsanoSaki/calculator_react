import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import NavBar from './navbar';
import Home from './content/home';
import Calculator from './content/calculator';
import Editor from './content/editor';
import About from './content/about';
import Login from './content/login';
import Register from './content/register';
import NotFound from './content/notfound';
import MySpace from './content/myspace';
import Profile from './content/profile';
import $ from 'jquery';

class App extends Component {
    state = {
        is_login: true,  // 是否登录
        username: 'AsanoSaki',  // 登录成功后保存用户名
        email: '1195595343@qq.com',  // 邮箱
        intro: '这个人很懒，什么也没留下',  // 个人介绍
        date_joined: '2023年',  // 注册时间
        gender: 'Other',  // 性别
    };

    componentDidMount() {  // Ajax一般写在这个函数里，当组件被挂载完成后执行函数
        $.ajax({
            url: 'http://localhost:8000/getinfo/',
            // url: 'http://8.130.54.44:8000/getinfo/',  // 部署在云服务器上
            type: 'GET',
            success: (resp) => {
                console.log(resp);
                if (resp.result === 'success') {  // 本地访问由于跨域问题没办法成功登录
                    this.setState({
                        is_login: true,
                        username: resp.username,
                        email: resp.email,
                        intro: resp.intro,
                        date_joined: resp.date_joined,
                        gender: resp.gender,
                    });
                } else {
                    this.setState({is_login: false, username: ''});
                }
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <NavBar is_login={this.state.is_login} username={this.state.username} />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/home' element={<Home />}></Route>
                        <Route path='/calculator' element={
                            this.state.is_login ? <Calculator /> : <Navigate replace to='/login' />
                        }></Route>
                        <Route path='/editor' element={
                            this.state.is_login ? <Editor /> : <Navigate replace to='/login' />
                        }></Route>
                        <Route path='/about' element={<About />}></Route>
                        <Route path='/login' element={
                            this.state.is_login ? <Navigate replace to='/' /> : <Login />
                        }></Route>
                        <Route path='/register' element={
                            this.state.is_login ? <Navigate replace to='/' /> : <Register />
                        }></Route>
                        <Route path='/myspace' element={
                            this.state.is_login ? <MySpace /> : <Navigate replace to='/login' />
                        }></Route>
                        <Route path='/profile' element={
                            this.state.is_login ?
                            <Profile
                                username={this.state.username}
                                email={this.state.email}
                                intro={this.state.intro}
                                date_joined={this.state.date_joined}
                                gender={this.state.gender}
                            /> : <Navigate replace to='/login' />
                        }></Route>
                        <Route path='/404' element={<NotFound />}></Route>
                        <Route path='*' element={<Navigate replace to='/404' />}></Route>
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;