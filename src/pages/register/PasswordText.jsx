import { CheckCircleOutlined, ErrorOutline } from '@material-ui/icons';
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
        style={
          state.isRight
            ? { color: 'rgb(13, 124, 13)' }
            : { color: 'rgb(185, 24, 24)' }
        }
      >
        {state.text}
      </span>
      {!state.isRight ? (
        <ErrorOutline className="errorIcon" />
      ) : (
        <CheckCircleOutlined className="rightIcon" />
      )}
    </span>
  );
};

export default PasswordContainer;
