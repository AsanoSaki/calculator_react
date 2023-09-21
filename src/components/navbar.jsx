import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class NavBar extends Component {
    state = {  };

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
                    <Link className="nav-link" to="/calculator">Calculator</Link>
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
                    <Link className="nav-link" to="/editor">Editor</Link>
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
                    <li className="nav-item">
                        <Link className="nav-link" to="/">{this.props.username}</Link>
                    </li>
                    <li className="nav-item" style={{paddingTop: '8px'}}>
                        |
                    </li>
                    <li className="nav-item">
                        <div style={{cursor: 'pointer'}} onClick={this.handleLogout} className="nav-link">Logout</div>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item" style={{paddingTop: '8px'}}>
                        |
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
                    <Link className="navbar-brand" to="/">AsanoSaki's Calculator & Editor</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            {this.render_calculator()}
                            {this.render_editor()}
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
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