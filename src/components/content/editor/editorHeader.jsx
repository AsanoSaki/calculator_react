import React, { Component } from 'react';
import $ from 'jquery';

class EditorHeader extends Component {
    state = {  }

    componentDidMount() {
        this.setLanguage();
        this.setFontSize();
        this.setShowLineNumber();
        this.setTheme();
        this.setTabSize();
    }

    setLanguage = () => {
        let language = $('#language_select option:selected').val();
        this.props.setLanguage(language);
        console.log('set_language', language);
    }

    setFontSize = () => {
        let font_size = $('#font_size').val();
        this.props.setFontSize(font_size);
        console.log('set_font_size', font_size);
    }

    setShowLineNumber = () => {
        let is_show = $('#show_line_number:checked').val() === 'on' ? true : false;
        this.props.setShowLineNumber(is_show);
        console.log('show_line_number', is_show);
    }

    setTheme = () => {
        let theme = $('#theme_select option:selected').val();
        this.props.setTheme(theme);
        console.log('set_theme', theme);
    }

    setTabSize = () => {
        let tab_size = $('#tab_select option:selected').val();
        this.props.setTabSize(tab_size);
        console.log('tab_select', tab_size);
    }

    setValue = (demo) => {
        let value;
        if (demo === 1)
            value = '#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello World" << endl;\n\treturn 0;\n}';
        else if (demo === 2)
            value = '#include <iostream>\nusing namespace std;\n\nint main() {\n\tint a;\n\tcin >> a;\n\tcout << a;\n\treturn 0;\n}';
        else if (demo === 3)
            value = '#include <iostream>\nusing namespace std;\n\nint main() {\n\tint a;\n\tfor (int i = 0; i < 1e9; i++) cin >> a;\n\treturn 0;\n}';
        else if (demo === 4)
            value = '#include <iostream>\nusing namespace std;\n\nint main() {\n\tcou << "Hello World" << endl;\n\tretun 0;\n}';
        else if (demo === 5)
            value = 'def f(name):\n\tprint(\'Hello\', name)\n\nf(\'Asanosaki\')';
        this.props.setValue(value);
    }

    render() {
        return (
            <React.Fragment>
                <div className="editor_header">
                    <ul className="nav">
                        <li className="nav-item">
                            <h3 style={{marginRight: '15px'}}>Code Editor</h3>
                        </li>
                        <li className="nav-item">
                            <select id="language_select" className="form-select" defaultValue="cpp" onChange={this.setLanguage}>
                                <option value="cpp">C++</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                            </select>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Settings</div>
                            <div style={{width: '25rem', height: '8rem'}} className="dropdown-menu">
                                <div className="container text-center">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <label style={{fontSize: '1rem'}} htmlFor="font_size" className="form-label">字体大小</label>
                                            <input id='font_size' style={{width: '8rem'}} type="range" className="form-range" min="15" max="30" defaultValue={18} onChange={this.setFontSize} />
                                        </div>
                                        <div className="col-sm-7">
                                            <select id='theme_select' style={{width: '12rem', float: 'right'}} className="form-select" onChange={this.setTheme}>
                                                <option value='githublight'>选择主题</option>
                                                <option value="okaidia">Okaidia</option>
                                                <option value="vscodedark">VS Code Dark</option>
                                                <option value="githublight">Github Light</option>
                                                <option value="githubdark">Github Dark</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div style={{marginTop: '1rem'}} className="col-sm-5 form-check form-switch form-check-reverse">
                                            <label style={{marginRight: '10px', fontSize: '1rem'}} className="form-check-label" htmlFor="show_line_number">代码行</label>
                                            <input style={{marginRight: '1px', width: '2.5rem'}} className="form-check-input" type="checkbox" role="switch" id="show_line_number" defaultChecked onChange={this.setShowLineNumber} />
                                        </div>
                                        <div className="col-sm-7">
                                            <select id='tab_select' style={{width: '12rem', float: 'right'}} className="form-select" onChange={this.setTabSize}>
                                                <option value={4}>缩进大小</option>
                                                <option value={2}>2 Tabs</option>
                                                <option value={4}>4 Tabs</option>
                                                <option value={8}>8 Tabs</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className='nav-link' style={{cursor: 'pointer'}} onClick={this.props.clearValue}>Clear</div>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Code Demo</div>
                                <ul className="dropdown-menu">
                                <li><div className="dropdown-item" style={{cursor: 'pointer'}} onClick={() => {this.setValue(1)}}>Code Demo 1</div></li>
                                <li><div className="dropdown-item" style={{cursor: 'pointer'}} onClick={() => {this.setValue(2)}}>Code Demo 2</div></li>
                                <li><div className="dropdown-item" style={{cursor: 'pointer'}} onClick={() => {this.setValue(3)}}>Code Demo 3</div></li>
                                <li><div className="dropdown-item" style={{cursor: 'pointer'}} onClick={() => {this.setValue(4)}}>Code Demo 4</div></li>
                                <li><div className="dropdown-item" style={{cursor: 'pointer'}} onClick={() => {this.setValue(5)}}>Code Demo 5</div></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default EditorHeader;