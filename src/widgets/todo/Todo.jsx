import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import './todo.css';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import { useSelector, useDispatch } from 'react-redux';
import { todoLists, addList } from '../../redux/features/todo/todoSlice';

import TodoTasks from './TodoTasks';

const Todo = () => {
  const taskList = useSelector(todoLists);
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskList.length === 0) {
      dispatch(addList());
    }
  }, []);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Draggable handle="strong">
      <div className="widgetContainer todoWidget box no-cursor">
        <strong
          className="cursor"
          style={{ width: 90 + '%', paddingLeft: '10px' }}
        >
          {' '}
          Todo Widget
        </strong>
        <CloseWidget id="todo" />

        <div className="todoWrap">
          <aside className="todo-category">
            {taskList.map((item, index) => {
              return <button onClick={handleTabChange}>{item.name}</button>;
            })}
            <button className="btn-add-category">Add Category</button>
          </aside>

          {taskList.map((item, index) => {
            return <TodoTasks tasks={item} listIndex={index} />;
          })}
        </div>
      </div>
    </Draggable>
  );
};

export default Todo;
