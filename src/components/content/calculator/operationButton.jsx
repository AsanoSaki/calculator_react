import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../../redux/actions';

class OperationButton extends Component {
    state = {  }
    render() {
        return (
            <button onClick={() => {this.props.choose_op(this.props.operation)}}>
                {this.props.operation}
            </button>
        );
    }
}

const mapDispatchToProps = {
    choose_op: (op) => {
        return {
            type: ACTIONS.CHOOSE_OP,
            op: op,
        }
    }
}

export default connect(null, mapDispatchToProps)(OperationButton);