import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './calculator.css';
import { calcFunc } from './calfFunc';
import CloseWidget from '../closeWidget/CloseWidget';

const Calculator = () => {
  const [resNum, setResNum] = useState(0);
  const [curValue, setCurValue] = useState(0);
  const [tempValue, setTempValue] = useState(0);
  const [tempFunc, setTempFunc] = useState();
  const [state, setState] = useState(false);
  const [eqState, setEqState] = useState(false);
  const [fontSize, setFontSize] = useState(52);
  const [funcId, setFuncId] = useState('');

  const calculate = (func) => {
    setResNum(curValue);
    if (!tempFunc) {
      setEqState(false);
      setTempValue(curValue);
      setState(true);
    } else {
      if (!state) {
        const res = tempFunc.func(tempValue, curValue);
        setTempValue(res);
        setEqState(false);
      }
    }
    setTempFunc({ func: func });
    setCurValue(0);
  };

  const handleClick = (item) => {
    const func = item.func;

    const num =
      Number(curValue + item.label) === 0 ? 0 : Number(curValue + item.label);

    if (item.className === 'calcNum') {
      setEqState(true);
      setCurValue(num);
      setState(false);
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
          setState(false);
          setEqState(false);
          setFuncId(false);
          break;
        case 'backspace':
          eqState
            ? setCurValue(Number(curValue.toString().slice(0, -1)))
            : setCurValue(curValue);
          break;
        case 'percentage':
          console.log(tempFunc);
          funcId
            ? setCurValue(curValue / 100)
            : setCurValue((curValue * tempValue) / 100);

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
          } else {
            if (curValue === resNum) {
              const res = tempFunc.func(tempValue, resNum);
              setResNum(curValue);
              setTempValue(res);
              setEqState(false);
            } else {
              const res = tempFunc.func(tempValue, curValue);

              setTempValue(res);
              setEqState(false);
            }
          }
          break;
        case 'negPoz':
          eqState ? setCurValue(curValue * -1) : setTempValue(tempValue * -1);
          break;
        case 'dot':
          curValue.toString().includes('.')
            ? setCurValue(curValue)
            : setCurValue(curValue.toString() + '.');
          break;

        default:
          break;
      }
    }
    if (item.className === 'calcFunc') {
      if (item.id === 'multiply' || item.id === 'divide') {
        setFuncId(true);
      } else {
        setFuncId(false);
      }
    }
  };

  useEffect(() => {
    let curLeng =
      curValue.toString().length > tempValue.toString().length
        ? curValue.toString().length
        : tempValue.toString().length;
    if (curLeng > 11) {
      setFontSize((52 * 11) / curLeng);
    } else {
      setFontSize(52);
    }
  }, [curValue, tempValue]);

  return (
    <Draggable handle="strong">
      <div className="calcContainer box no-cursor">
        <strong className="cursor" style={{ width: 100 + '%' }}></strong>
        <CloseWidget id="calculator" />

        <div className="calcScreen">
          <div className="calcResScreen" style={{ fontSize: fontSize + 'px' }}>
            {!eqState ? tempValue : curValue}
          </div>
        </div>
        <div className="calcNumFuncWrap">
          {calcFunc.map((item) => {
            return (
              <button
                className={item.className}
                onClick={() => handleClick(item)}
                key={item.id}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </Draggable>
  );
};

export default Calculator;
