import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import NavBar from './navbar';
import Home from './content/home';
import Calculator from './content/calculator';
import About from './content/about';
import Login from './content/login';
import Register from './content/register';
import NotFound from './content/notfound';
import $ from 'jquery';

class App extends Component {
    state = {
        is_login: true,  // 是否登录
        username: 'AsanoSaki',  // 登录成功后保存用户名
    };

    componentDidMount() {  // Ajax一般写在这个函数里，当组件被挂载完成后执行函数
        $.ajax({
            url: 'http://localhost:8000/getinfo/',
            type: 'GET',
            success: (resp) => {
                console.log(resp);
                if (resp.result === 'success') {  // 本地访问由于跨域问题没办法成功登录
                    this.setState({is_login: true, username: resp.username});
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
                        <Route path='/about' element={<About />}></Route>
                        <Route path='/login' element={
                            this.state.is_login ? <Navigate replace to='/' /> : <Login />
                        }></Route>
                        <Route path='/register' element={
                            this.state.is_login ? <Navigate replace to='/' /> : <Register />
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