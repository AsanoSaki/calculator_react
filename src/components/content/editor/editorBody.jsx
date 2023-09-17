import React, { Component } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import Card from '../card';

class EditorBody extends Component {
    state = {  };

    getLanguage = (language) => {
        if (language === 'cpp') return langs.cpp();
        else if (language === 'java') return langs.java();
        else if (language === 'python') return langs.python();
    }

    getTheme = (theme) => {
        if (theme === 'okaidia' || theme === 'theme_select') return okaidia;
        else if (theme === 'vscodedark') return vscodeDark;
        else if (theme === 'githublight') return githubLight;
        else if (theme === 'githubdark') return githubDark;
    }

    setValue = (value) => {
        this.props.setValue(value);
        console.log(value);
    }

    render() {
        return (
            <Card>
                <CodeMirror
                    style={{fontSize: `${this.props.fontSize}px`}}
                    value={this.props.value}
                    height={"650px"}
                    extensions={[
                        this.getLanguage(this.props.language),
                        EditorView.updateListener.of((v) => {
                            console.log(v.docChanged);
                            if (v.docChanged)
                                this.setValue(v.state.doc.toString());
                        }),
                    ]}
                    basicSetup={{
                        tabSize: parseInt(this.props.tab_size),
                        lineNumbers: this.props.show_line_number,
                    }}
                    theme={this.getTheme(this.props.theme)}
                />
            </Card>
        );
    }
}

export default EditorBody;