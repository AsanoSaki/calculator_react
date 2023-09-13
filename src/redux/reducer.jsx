import ACTIONS from "./actions";

const evaluate = (state) => {
    let { currentOperand, lastOperand, operation } = state;  // 解构时必须用原名
    let last = parseFloat(lastOperand);
    let cur = parseFloat(currentOperand);
    let res;
    switch(operation) {
        case '+':
            res = last + cur;
            break;  // 不加break后面还会继续执行
        case '-':
            res = last - cur;
            break;
        case '×':
            res = last * cur;
            break;
        case '÷':
            res = last / cur;
            break;
        default:
            break;
    }
    return res.toString();
}

const reducer = (state={
    currentOperand: '',  // 当前操作数
    lastOperand: '',  // 之前的操作数
    operation: '',  // 操作符
    overwrite: false,  // 输入操作数时是否将之前的运算结果覆盖
}, action) => {
    switch(action.type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite)
                return { ...state, overwrite: false, currentOperand: action.digit }
            if (state.currentOperand === '0' && action.digit === '0')  // 多次按0只显示一个
                return state;
            if (state.currentOperand === '0' && action.digit !== '.')  // 之前有0的话应该用当前数字直接把0覆盖掉
                return { ...state, currentOperand: action.digit }
            if (action.digit === '.' && state.currentOperand.includes('.'))  // 已经有小数点了就不能再添加小数点
                return state;
            if (action.digit === '.' && state.currentOperand === '')  // 不输入数字直接打小数点需要在前面补零
                return { ...state, currentOperand: '0.' }
            return {
                ...state,
                currentOperand: state.currentOperand + action.digit,
            }
        case ACTIONS.DELETE_DIGIT:
            if (state.currentOperand === '')  // 已经为空就不执行删除操作了
                return state;
            if (state.overwrite)  // 运算完后点删除键需要清空
                return {
                    ...state,
                    currentOperand: '',
                    overwrite: false,
                }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            }
        case ACTIONS.CHOOSE_OP:
            if (state.lastOperand === '' && state.currentOperand === '')  // 还没有任何数字时点运算符没效果
                return state;
            if (state.lastOperand === '')  // last为空的话需要直接把当前的操作符放上去
                return {
                    ...state,
                    lastOperand: state.currentOperand,
                    operation: action.op,
                    currentOperand: '',
                }
            if (state.currentOperand === '')  // current为空则直接替换运算符
                return {
                    ...state,
                    operation: action.op,
                }
            return {
                ...state,
                lastOperand: evaluate(state),  // eval表示运算，如果current有数字时又点了运算符则将运算结果存到last中
                operation: action.op,
                currentOperand: '',
            }
        case ACTIONS.CLEAR:
            return {
                ...state,
                currentOperand: '',
                lastOperand: '',
                operation: '',
            }
        case ACTIONS.EVALUATE:
            if (state.currentOperand === '' || state.lastOperand === '' || state.operation === '')  // 有一个为空就不运算
                return state;
            return {
                ...state,
                currentOperand: evaluate(state),
                lastOperand: '',
                operation: '',
                overwrite: true,
            }
        default:
            return state;
    }
};

export default reducer;