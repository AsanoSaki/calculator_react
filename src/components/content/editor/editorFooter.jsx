import React, { Component } from 'react';
import $ from 'jquery';

class EditorFooter extends Component {
    state = {
        input_rows: 1,
        output_rows: 1,
        output_content: '',
        run_status: '',
        run_time: null,
    };

    updateInputHeight = () => {
        let content = $('#input').val();
        let line_cnt = content.split('\n').length;  // 计算行数
        this.setState({input_rows: line_cnt});
    }

    updateOutputHeight = () => {
        let content = this.state.output_content;
        let line_cnt = content.split('\n').length;
        console.log(content);
        console.log(line_cnt);
        this.setState({output_rows: line_cnt});
    }

    renderRunStatus = () => {
        let color;
        if (this.state.run_status === 'Running') color = 'rgb(51, 122, 183)'
        else if (this.state.run_status === 'Success') color = 'rgb(68, 157, 68)'
        else color = 'rgb(208, 84, 81)'
        return (
            <span id='run_status' style={{fontWeight: 500, fontSize: '1.5rem', color: color}}>
                {this.state.run_status}
            </span>
        );
    }

    renderSpinner = () => {
        if (this.state.run_status === 'Running')
            return (
                <span
                    className="spinner-border" role="status"
                    style={{width: '1.5rem', height: '1.5rem', marginLeft: '10px', color: 'rgb(51, 122, 183)'}}>
                </span>
            );
    }

    renderRunTime = () => {
        if (this.state.run_time)
            return (
                <div style={{margin: '0 0 10px 25px'}}>Run Time: {this.state.run_time} ms</div>
            );
    }

    handleRunCode = (e) => {
        e.preventDefault();
        let code_input = $('#input').val();
        console.log('value:', this.props.value);
        console.log('language:', this.props.language);
        console.log('input:', code_input);
        this.setState({run_status: 'Running'});  // 设置run_status为执行代码中
        $.ajax({
            url: 'http://localhost:8000/runcode/',
            // url: 'http://8.130.54.44:8000/runcode/',  // 部署在云服务器上
            type: 'GET',
            data: {
                value: this.props.value,
                language: this.props.language,
                code_input: code_input,
            },
            dataType: 'json',
            success: (resp) => {
                console.log(resp);
                if (resp.status === 'Success') {
                    let output = resp.output;
                    if (output.charAt(output.length - 1) === '\n')  // 去掉最后的空行
                        output = output.substr(0, output.length - 1);
                    this.setState({output_content: output});
                    // this.updateOutputHeight();
                    setTimeout(this.updateOutputHeight, 1);  // 更新输出框高度，设置一毫秒延迟，直接调用会有玄学问题读取不到更新后的state
                    this.setState({run_status: resp.status});
                    this.setState({run_time: Math.round(resp.cputime)});
                } else {  // 没有成功运行
                    this.setState({run_status: resp.status});
                    // 在输出框输出错误信息
                    let err_info = resp.error;
                    if (err_info.charAt(err_info.length - 1) === '\n')  // 去掉最后的空行
                        err_info = err_info.substr(0, err_info.length - 1);
                    this.setState({output_content: err_info});
                    setTimeout(this.updateOutputHeight, 1);
                }
            }
        });
    }

    render() {
        return (
            <div className="accordion" id="editor_footer" style={{marginTop: '15px'}}>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="heading">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#run_code" aria-expanded="false" aria-controls="flush-collapseOne">
                            Run Code Menu
                        </button>
                    </h2>
                    <div id="run_code" className="accordion-collapse collapse" aria-labelledby="heading" data-bs-parent="#editor_footer">
                        <div className="container text-center">
                            <div className="row" style={{margin: '20px 0 10px 0'}}>
                                <div className="col-sm-8" style={{textAlign: 'left'}}>
                                    {this.renderRunStatus()}
                                    {this.renderSpinner()}
                                </div>
                                <div className="col-sm-4" style={{textAlign: 'right'}}>
                                    <button className="btn btn-outline-primary me-md-4" type="button" style={{width: '6rem', borderRadius: '25px'}}>Debug</button>
                                    <button className="btn btn-outline-success" type="button" style={{width: '6rem', borderRadius: '25px'}} onClick={this.handleRunCode}>Run</button>
                                </div>
                            </div>
                        </div>
                        <div style={{margin: '0 25px'}}>
                            <label htmlFor="input" className="form-label">Input</label>
                            <textarea className="form-control" id="input" rows={this.state.input_rows} onChange={this.updateInputHeight}></textarea>
                        </div>
                        <div style={{margin: '10px 25px'}}>
                            <label htmlFor="output" className="form-label">Output</label>
                            <textarea className="form-control" id="output" rows={this.state.output_rows} readOnly value={this.state.output_content}></textarea>
                        </div>
                        {this.renderRunTime()}
                    </div>
                </div>
            </div>
        );
    }
}

export default EditorFooter;