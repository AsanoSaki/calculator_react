import React, { Component } from 'react';
import Card from './card';

class About extends Component {
    state = {  }
    render() {
        return (
            <Card>
                <h3>About</h3>
                <hr />
                <div className="card" style={{width: '20rem', margin: '0 auto'}}>
                    <div className="card-body text-center">
                        <h4 className="card-title">AsanoSaki</h4>
                        <p className="card-text">这个人是个菜鸡~</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">学校: 西安电子科技大学</li>
                        <li className="list-group-item">学院: 人工智能学院</li>
                        <li className="list-group-item">专业: 计算机技术</li>
                        <li className="list-group-item">邮箱: Yujie.Yi@stu.xidian.edu.cn</li>
                    </ul>
                    <div className="card-body text-center">
                        <a href="https://github.com/AsanoSaki" target='_blank' rel="noreferrer" className="card-link">Github</a>
                        <a href="https://asanosaki.github.io" target='_blank' rel="noreferrer" className="card-link">Blog</a>
                        <a href="https://www.xidian.edu.cn" target='_blank' rel="noreferrer" className="card-link">Xidian University</a>
                    </div>
                </div>
            </Card>
        );
    }
}

export default About;