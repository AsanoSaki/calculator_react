import React, { Component } from 'react';
import Card from './card';
import $ from 'jquery';

class Register extends Component {
    state = {
        username: '',
        password: '',
        confirm_password: '',
        error_message: '',
    };

    handleRegister = (e) => {
        e.preventDefault();  // 阻止默认的提交行为，之后用ajax提交
        this.setState({error_message: ''});
        // 其实在register后端函数里也有判断以下内容
        if (this.state.username === '' || this.state.password === '') {  // 判断用户名或密码是否为空
            this.setState({error_message: 'Username or password must not be empty!'});
        } else if (this.state.password !== this.state.confirm_password) {  // 判断密码和确认密码是否一致
            this.setState({error_message: 'The input of two passwords are inconsistent!'});
        } else {  // 用jQuery向后端请求登录
            $.ajax({
                url: 'http://localhost:8000/register/',
                type: 'GET',
                data: {
                    username: this.state.username,
                    password: this.state.password,
                    confirm_password: this.state.confirm_password,
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
                <h3>Register</h3>
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
                                <div className="mb-3">
                                    <label htmlFor="inputConfirmPassword" className="form-label">Confirm password</label>
                                    <input
                                        onChange={(e) => {this.setState({confirm_password: e.target.value})}}
                                        type="password" className="form-control" id="inputConfirmPassword"
                                    />
                                </div>
                                <div style={{fontSize: '1rem', color: 'red'}}>
                                    {this.state.error_message}
                                </div>
                                <button onClick={this.handleRegister} style={{width: '100%', marginTop: '10px'}} type="submit" className="btn btn-primary">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default Register;