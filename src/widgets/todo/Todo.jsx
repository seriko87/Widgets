import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import './todo.css';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  todoLists,
  addList,
} from '../../redux/features/todo/todoSlice';
import TodoTask from './TodoTask';

const Todo = () => {
  const [task, setTask] = useState('');
  const [error, setError] = useState(false);
  const taskList = useSelector(todoLists);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    if (task.length === 0) {
      setError(true);
    } else {
      dispatch(addTask({ id: id, text: task, finished: false }));
      setError(false);
      setTask('');
    }
  };

  useEffect(() => {
    if (taskList.length === 0) {
      dispatch(addList());
    }
  }, []);

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
                className={error ? 'todo-input todo-error' : 'todo-input'}
                value={task}
                onChange={handleChange}
              />
              <button className="btn-add" onClick={handleSubmit}>
                add
              </button>
            </form>
            <div className="task-list-container">
              <span className="todo-label">Active</span>
              {taskList.map((item) => {
                if (!item.finished) {
                  return <TodoTask task={item} />;
                }
                return null;
              })}
              <span className="todo-label">Finished</span>
              {taskList.map((item) => {
                if (item.finished) {
                  return <TodoTask task={item} />;
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Todo;
