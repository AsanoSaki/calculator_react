import React, { Component } from 'react';
import Card from './card';
import EditorHeader from './editor/editorHeader';
import EditorBody from './editor/editorBody';
import EditorFooter from './editor/editorFooter';

class Editor extends Component {
    state = {
        language: '',
        font_size: 0,
        show_line_number: true,
        tab_size: '',
        theme: '',
        value: '',
    };

    setLanguage = (language) => {
        this.setState({language: language});
    }

    setFontSize = (font_size) => {
        this.setState({font_size: font_size});
    }

    setShowLineNumber = (is_show) => {
        this.setState({show_line_number: is_show});
    }

    setTheme = (theme) => {
        this.setState({theme: theme});
    }

    setValue = (value) => {
        this.setState({value: value});
    }

    setTabSize = (tab_size) => {
        this.setState({tab_size: tab_size});
    }

    clearValue = () => {
        this.setState({value: ''});
    }

    render() {
        // <p>当前语言：{this.state.language}，当前字号：{this.state.font_size}，当前主题：{this.state.theme}，显示行号：{this.state.show_line_number.toString()}，Tab大小：{this.state.tab_size}</p>
        return (
            <Card>
                <EditorHeader
                    setLanguage={this.setLanguage}
                    setFontSize={this.setFontSize}
                    setShowLineNumber={this.setShowLineNumber}
                    setTheme={this.setTheme}
                    setTabSize={this.setTabSize}
                    clearValue={this.clearValue}
                    setValue={this.setValue}
                />
                <EditorBody
                    fontSize={this.state.font_size}
                    language={this.state.language}
                    theme={this.state.theme}
                    value={this.state.value}
                    setValue={this.setValue}
                    tab_size={this.state.tab_size}
                    show_line_number={this.state.show_line_number}
                />
                <EditorFooter
                    value={this.state.value}
                    language={this.state.language}
                />
            </Card>
        );
    }
}

export default Editor;