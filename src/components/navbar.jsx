import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';
import setPromiseInterval from 'set-promise-interval';

class NavBar extends Component {
    state = {
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    componentDidMount() {
        setPromiseInterval(() => {  // 设置定时器更新当前时间
            this.setState({time: moment().format('YYYY-MM-DD HH:mm:ss')})
        }, 200);
    }

    handleLogout = () => {
        $.ajax({
            url: 'http://localhost:8000/logout/',
            // url: 'http://8.130.54.44:8000/logout/',  // 部署在云服务器上
            type: 'GET',
            success: (resp) => {
                console.log(resp);
                if (resp.result === 'success') {
                    window.location.href='/';  // 重定向到根路径
                }
            }
        });
    }

    render_calculator = () => {  // 是否渲染出Calculator界面
        if (this.props.is_login) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/calculator">💡Calculator</Link>
                </li>
            )
        } else {
            return '';
        }
    }

    render_editor = () => {
        if (this.props.is_login) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/editor">💻Editor</Link>
                </li>
            )
        } else {
            return '';
        }
    }

    render_userinfo = () => {  // 是否渲染登录登出界面与用户信息
        if (this.props.is_login) {
            return (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {this.props.username}
                        </span>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/myspace">My Space</Link></li>
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <hr />
                            <li>
                                <span style={{cursor: 'pointer'}} onClick={this.handleLogout} className="dropdown-item">Logout</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </ul>
            )
        }
    }

    // container-fluid布局会靠在左右两边，把fluid去掉就会稍微靠中间一点
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand" to="/">AsanoSaki's Tools</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">🏠Home</Link>
                            </li>
                            {this.render_calculator()}
                            {this.render_editor()}
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">📨About</Link>
                            </li>
                            <li className="nav-item" style={{fontWeight: 500, fontSize: '1.6rem', color: 'rgb(132, 202, 240)', marginLeft: '10px'}}>
                                ⏱️{this.state.time}
                            </li>
                        </ul>
                        {this.render_userinfo()}
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;