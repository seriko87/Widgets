import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './todo.css';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, todoLists } from '../../redux/features/todo/todoSlice';
import TodoTask from './TodoTask';

const Todo = () => {
  const [task, setTask] = useState('');
  const taskList = useSelector(todoLists);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    dispatch(addTask({ id: id, text: task, finished: false }));
    setTask('');
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
            <button className="btn-add-category">Add Category</button>
          </aside>
          <div className="todo-list">
            <form action="" className="todo-form">
              <input
                type="text"
                className="todo-input"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button className="btn-add" onClick={handleSubmit}>
                add
              </button>
            </form>
            <div className="task-list-container">
              {taskList.map((item) => {
                return <TodoTask task={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Todo;
