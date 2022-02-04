import React from 'react';
import './loading.css';

const Loading = ({ width, height }) => {
  const style = {
    width: width,
    height: height,
  };
  return (
    <div className="loadingWrapper">
      {' '}
      <div style={style} className="loader"></div>
    </div>
  );
};

export default Loading;
