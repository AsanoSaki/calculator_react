import React, { Component } from 'react';
import Card from './card';
import $ from 'jquery';

class Login extends Component {
    state = {
        username: '',
        password: '',
        error_message: '',  // 错误信息提示
    };

    handleLogin = (e) => {
        e.preventDefault();  // 阻止默认的提交行为，之后用ajax提交
        this.setState({error_message: ''});
        if (this.state.username === '' || this.state.password === '') {  // 判断用户名或密码是否为空
            this.setState({error_message: 'Username or password must not be empty!'});
        } else {  // 用jQuery向后端请求登录
            $.ajax({
                url: 'http://localhost:8000/login/',
                // url: 'http://8.130.54.44:8000/login/',  // 部署在云服务器上
                type: 'GET',
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
                dataType: 'json',
                success: (resp) => {
                    console.log(resp);
                    if (resp.result === 'success') {
                        window.location.href='/';  // 重定向到根路径
                    } else {
                        this.setState({error_message: resp.result});
                    }
                }
            });
        }
    }

    render() {
        return (
            <Card>
                <h3>Login</h3>
                <hr />
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col col-sm-4">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="inputUsername" className="form-label">Username</label>
                                    <input
                                        onChange={(e) => {this.setState({username: e.target.value})}}
                                        type="text" className="form-control" id="inputUsername" aria-describedby="usernameHelp"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input
                                        onChange={(e) => {this.setState({password: e.target.value})}}
                                        type="password" className="form-control" id="inputPassword"
                                    />
                                </div>
                                <div style={{fontSize: '1rem', color: 'red'}}>
                                    {this.state.error_message}
                                </div>
                                <button onClick={this.handleLogin} style={{width: '100%', marginTop: '10px'}} type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default Login;