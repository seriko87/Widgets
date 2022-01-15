import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React from 'react';

import { useEffect, useReducer } from 'react';
import { passReducer } from './passReducer';
const defaultState = {
  text: '',
  isRight: false,
};

const PasswordContainer = ({ item, pass }) => {
  const [state, dispatch] = useReducer(passReducer, defaultState);

  useEffect(() => {
    dispatch({ type: item, payload: pass });
  }, [pass]);

  return (
    <span className="errorPass">
      <span
        // style={
        //   state.isRight
        //     ? { color: 'var(--color-alert)' }
        //     : { color: 'rgb(185, 24, 24)' }
        // }
        className={state.isRight ? 'alertTrue' : 'alertFalse'}
      >
        {state.text}
      </span>
      {!state.isRight ? (
        <ErrorOutlineIcon className="errorIcon" />
      ) : (
        <CheckCircleOutlineIcon className="rightIcon" />
      )}
    </span>
  );
};

export default PasswordContainer;
