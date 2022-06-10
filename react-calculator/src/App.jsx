import React, { useState } from 'react'

const App = () => {
    
    const [preNum, setPreNum] = useState('');
    const [currNum, setCurrNum] = useState('');
    const [operator, setOperator] = useState('');
    const [total, setTotal] = useState(0);
    const [isCheck, setIsCheck] = useState(true);
    const [isTotal, setIsTotal] = useState(true);

    const handleOneClick = (e) => {
        const btnValue = e.target.value;
        // AC && = 예외처리 시작
        if (btnValue === "AC") {
            reset();
            return;
        }
        if (btnValue === '=') {
            setIsCheck(true);
            calculator();
            return;
        }

        // 연산을 한번이라도 실행한 경우 예외처리
        setIsCheck(false);

        // 숫자 && 사칙연산 기호 예외처리 시작
        if (isNumber(btnValue)) {
            if (isTotal && isCheck) {
                setIsTotal(false);
                totalToPrevNum();
            }
            // 다시 확인
            if (operator === '') setPreNum((preNum) => {
                console.log(preNum);
                if(preNum.length >= 3) {
                    alert("숫자의 자리수는 세자리까지 가능합니다.");
                    return preNum;
                };
                return preNum += btnValue;
            });
            else setCurrNum((currNum) => {
                if(currNum.length >= 3) {
                    alert("숫자의 자리수는 세자리까지 가능합니다.");
                    return currNum;
                };
               return currNum += btnValue;
            });

        } else {

            if (isTotal && isCheck) {
                setIsTotal(false);
                totalToPrevNum();
            }

            setOperator(btnValue);
        };
    }

    const calculator = () => {
        if(operator === '' || preNum === '' || currNum === '') return alert("연산이 불가능 합니다.");
        setIsCheck(true);
        setIsTotal(true);
        setOperator('');
        if (operator === '+') setTotal(Number(preNum) + Number(currNum));
        if (operator === '-') setTotal(Number(preNum) - Number(currNum));
        if (operator === 'x') setTotal(Number(preNum) * Number(currNum));
        if (operator === '/') setTotal(parseInt(Number(preNum) / Number(currNum)));
    }

    const reset = () => {
        setPreNum('');
        setCurrNum('');
        setOperator('');
        setTotal(0);
        setIsCheck(true);
        setIsTotal(true);
    }

    const isNumber = (value) => {
        const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        if(num.includes(value)) return true;
        else return false;
    }

    const totalToPrevNum = () => {
        if(total === 0) return;
        setPreNum(total.toString());
        setOperator('');
        setCurrNum('');
    }

    return <div id="app">
        <div className="calculator">
            {/* 컴포넌트 초기화 방어코드 */}
            <h1 id="total">{(isCheck && isTotal) ? total : `${preNum} ${operator} ${currNum}`}</h1>
            <div className="digits flex">
                <button className="digit" value={9} onClick={handleOneClick}>9</button>
                <button className="digit" value={8} onClick={handleOneClick}>8</button>
                <button className="digit" value={7} onClick={handleOneClick}>7</button>
                <button className="digit" value={6} onClick={handleOneClick}>6</button>
                <button className="digit" value={5} onClick={handleOneClick}>5</button>
                <button className="digit" value={4} onClick={handleOneClick}>4</button>
                <button className="digit" value={3} onClick={handleOneClick}>3</button>
                <button className="digit" value={2} onClick={handleOneClick}>2</button>
                <button className="digit" value={1} onClick={handleOneClick}>1</button>
                <button className="digit" value={0} onClick={handleOneClick}>0</button>
            </div>
            <div className="modifiers subgrid">
                <button className="modifier" value={"AC"} onClick={handleOneClick}>AC</button>
            </div>
            <div className="operations subgrid">
                <button className="operation" value={'/'} onClick={handleOneClick}>/</button>
                <button className="operation" value={'x'} onClick={handleOneClick}>X</button>
                <button className="operation" value={'-'} onClick={handleOneClick}>-</button>
                <button className="operation" value={'+'} onClick={handleOneClick}>+</button>
                <button className="operation" value={'='} onClick={handleOneClick}>=</button>
            </div>
        </div>
    </div>
}

export default App;