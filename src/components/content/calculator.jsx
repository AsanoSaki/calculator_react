import React, { Component } from 'react';
import Card from './card';
import { connect } from 'react-redux';
import DigitButton from './calculator/digitButton';
import OperationButton from './calculator/operationButton';
import ACTIONS from '../../redux/actions';

class Calculator extends Component {
    state = {
        formater: Intl.NumberFormat('en-us'),  // 将数字每隔3位用逗号隔开
    };

    number_format = (number) => {
        if (number === '') return '';
        const [integer, decimal] = number.split('.');
        if (decimal === undefined)  // 没有小数部分则直接将整个数格式化
            return this.state.formater.format(integer);
        return `${this.state.formater.format(integer)}.${decimal}`;  // 有小数部分则不格式化小数部分
    }

    render() {
        return (
            <Card>
                <h3>Calculator</h3>
                <hr />
                <div className="calculator">
                    <div className="output">
                        <div className="last_output">
                            {this.props.lastOperand} {this.props.operation}
                        </div>
                        <div className="current_output">
                            {this.number_format(this.props.currentOperand)}
                        </div>
                    </div>
                    <button onClick={this.props.clear}>C</button>
                    <button onClick={this.props.delete_digit}>←</button>
                    <button>x²</button>
                    <OperationButton operation={'÷'} />
                    <DigitButton digit={'7'} />
                    <DigitButton digit={'8'} />
                    <DigitButton digit={'9'} />
                    <OperationButton operation={'×'} />
                    <DigitButton digit={'4'} />
                    <DigitButton digit={'5'} />
                    <DigitButton digit={'6'} />
                    <OperationButton operation={'-'} />
                    <DigitButton digit={'1'} />
                    <DigitButton digit={'2'} />
                    <DigitButton digit={'3'} />
                    <OperationButton operation={'+'} />
                    <button>+/-</button>
                    <DigitButton digit={'0'} />
                    <DigitButton digit={'.'} />
                    <button onClick={this.props.evaluate}>=</button>
                </div>
            </Card>
        );
    }
};

const mapStateToProps = (state, props) => {  // 有3个状态要维护
    return {
        currentOperand: state.currentOperand,
        lastOperand: state.lastOperand,
        operation: state.operation,
    }
};

const mapDispatchToProps = {
    delete_digit: () => {
        return {
            type: ACTIONS.DELETE_DIGIT,
        }
    },
    clear: () => {
        return {
            type: ACTIONS.CLEAR,
        }
    },
    evaluate: () => {
        return {
            type: ACTIONS.EVALUATE,
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);