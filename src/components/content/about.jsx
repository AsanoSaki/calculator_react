import React, { Component } from 'react';
import Card from './card';
import $ from 'jquery';

class About extends Component {
    state = {
        func_id: null,  // setTimeout函数的id，如果在计时结束前重复点击需要清除之前定时函数，重新计时
    }

    componentDidMount() {
        this.hide_send_status();
    }

    hide_send_status = () => {
        $('#send_status').hide();
    }

    handleSendEmail = () => {
        let outer = this;
        let message = $('#input').val();
        let $send_status = $('#send_status');

        $.ajax({
            url: 'http://localhost:8000/sendemail/',
            // url: 'http://8.130.54.44:8000/sendemail/',  // 部署在云服务器上
            type: 'GET',
            data: {
                message: message,
            },
            dataType: 'json',
            success: (resp) => {
                console.log(resp);
                if (resp.result === 'success') {
                    $send_status.fadeIn();
                    if (this.state.func_id) clearTimeout(this.state.func_id);
                    this.setState({func_id: setTimeout(function() {
                        $send_status.fadeOut();
                        outer.setState({func_id: null});
                    }, 2000)});
                }
            }
        });
    }

    render() {
        return (
            <Card>
                <h3>About</h3>
                <hr />
                <div className='row'>
                    <div className='col-sm-4'>
                        <div className="card" style={{width: '20rem', margin: '10rem 5rem'}}>
                            <div className="card-header">
                                About Me
                            </div>
                            <div className="card-body text-center">
                                <h4 className="card-title">AsanoSaki</h4>
                                <p className="card-text">本人是个⚡专的菜🐔~</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">生日: 2001.04.17</li>
                                <li className="list-group-item">学校: 西安电子科技大学</li>
                                <li className="list-group-item">学院: 人工智能学院</li>
                                <li className="list-group-item">专业: 计算机技术</li>
                                <li className="list-group-item">邮箱: Yujie.Yi@stu.xidian.edu.cn</li>
                            </ul>
                            <div className="card-footer text-center">
                                <a href="https://github.com/AsanoSaki" target='_blank' rel="noreferrer" className="card-link">Github</a>
                                <a href="https://asanosaki.github.io" target='_blank' rel="noreferrer" className="card-link">Blog</a>
                                <a href="https://www.xidian.edu.cn" target='_blank' rel="noreferrer" className="card-link">Xidian University</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-8'>
                        <div className="card" style={{width: '40rem', margin: '0 5rem'}}>
                            <div className="card-header">
                                Contact Me
                            </div>
                            <div className="card-body text-center">
                                <h4 className="card-title" style={{marginBottom: '15px'}}>感谢您给我们宝贵的意见~</h4>
                                <textarea className="form-control" id="input" rows="20"></textarea>
                                <div className="d-grid gap-4 d-md-flex justify-content-md-end" style={{marginTop: '15px'}}>
                                    <div id='send_status' style={{fontWeight: 500, fontSize: '1.5rem', color: 'rgb(68, 157, 68)'}}>
                                        Send successfully!
                                    </div>
                                    <button className="btn btn-outline-primary" type="button" style={{width: '8rem', borderRadius: '25px'}} onClick={this.handleSendEmail}>Send Email</button>
                                </div>
                            </div>
                            <div className="card-footer text-end">
                                Tips: 邮件是匿名发送的哦~
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default About;