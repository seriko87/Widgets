import React, { useState, useEffect } from 'react';
import './calculator.css';
import { calcFunc } from './calfFunc';

const Calculator = () => {
  const [resNum, setResNum] = useState(0);
  const [curValue, setCurValue] = useState(0);
  const [tempValue, setTempValue] = useState(0);
  const [tempFunc, setTempFunc] = useState();

  const calculate = (func) => {
    // if (!tempFunc) {
    //   setTempValue(curValue);
    //   setTempFunc({ func: func });
    //   setCurValue(0);
    // } else if (resNum !== 0) {
    //   const res = tempFunc.func(tempValue, curValue);
    //   setCurValue(0);
    //   setTempValue(res);
    //   setTempFunc({ func: func });
    // } else {
    //   setTempFunc({ func: func });
    // }
    if (!tempFunc) {
      setTempValue(curValue);
      setTempFunc({ func: func });
      setCurValue(0);
    } else if (resNum !== 0) {
      const res = tempFunc.func(tempValue, curValue);
      setCurValue(0);
      setTempValue(res);
      setTempFunc({ func: func });
    } else {
      setTempFunc({ func: func });
    }
  };

  const handleClick = (item) => {
    const func = item.func;

    if (item.className === 'calcNum') {
      if (!tempFunc) {
      }
      setCurValue(parseInt(curValue + item.label));
    } else {
      switch (item.id) {
        case 'cancel':
          setCurValue(0);
          break;
        case 'clearAll':
          setCurValue(0);
          setTempValue(0);
          setResNum(0);
          setTempFunc(null);
          break;
        case 'backspace':
          break;
        case 'percentage':
          setCurValue(curValue / 100);
          break;
        case 'divideOne':
          setCurValue(1 / curValue);
          break;
        case 'square':
          setCurValue(curValue * curValue);
          break;
        case 'squareRoot':
          setCurValue(Math.sqrt(curValue));
          break;
        case 'divide':
          calculate(func);
          break;
        case 'multiply':
          calculate(func);
          break;
        case 'minus':
          calculate(func);
          break;
        case 'plus':
          calculate(func);
          break;
        case 'equal':
          if (!tempFunc) {
            break;
          } else if (curValue !== 0) {
            const res = tempFunc.func(tempValue, curValue);
            setCurValue(0);
            setTempValue(res);
            setTempFunc({ func: func });
          } else {
            setTempFunc({ func: func });
          }

          break;
        default:
          break;
      }
    }
  };
  console.log({
    curVal: curValue,
    tempVal: tempValue,
    res: resNum,
    func: tempFunc,
  });
  //    useEffect(() => {
  //         setResult()
  //   }, [result])

  console.log(Math.pow(100, 1));
  return (
    <div className="calcContainer">
      <div className="calcScreen">
        <div className="calcMemScreen">{resNum}</div>
        <div className="calcResScreen">
          {curValue !== 0 ? curValue : tempValue}
        </div>
      </div>
      <div className="calcNumFuncWrap">
        {calcFunc.map((item) => {
          return (
            <button
              className={item.className}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
