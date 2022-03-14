import React from 'react';
import Draggable from 'react-draggable';
import './todo.css';
import CloseWidget from '../../components/closeWidget/CloseWidget';

const Todo = () => {
  return (
    <Draggable handle="strong">
      <div className="widgetContainer todoWidget box no-cursor">
        <strong className="cursor" style={{ width: 90 + '%' }}></strong>
        <CloseWidget id="todo" />

        <div>Hello</div>
      </div>
    </Draggable>
  );
};

export default Todo;
