import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, todoLists } from '../../redux/features/todo/todoSlice';
import TodoTask from './TodoTask';

const TodoTasks = ({ tasks, listIndex }) => {
  const { listId, taskArray } = tasks;
  const [note, setNote] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  console.log(listId, taskArray);
  const handleChange = (e) => {
    setNote(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    if (note.length === 0) {
      setError(true);
    } else {
      dispatch(
        addTask({
          listId: listId,
          listIndex: listIndex,
          task: { taskId: id, text: note, finished: false },
        })
      );
      setError(false);
      setNote('');
    }
  };
  return (
    <div className="todo-list">
      <form action="" className="todo-form">
        <input
          type="text"
          className={error ? 'todo-input todo-error' : 'todo-input'}
          value={note}
          onChange={handleChange}
        />
        <button className="btn-add" onClick={handleSubmit}>
          add
        </button>
      </form>
      <div className="task-list-container">
        <span className="todo-label">Active</span>
        {taskArray.map((item) => {
          if (!item.finished) {
            return <TodoTask task={item} />;
          }
          return null;
        })}
        <span className="todo-label">Finished</span>
        {taskArray.map((item) => {
          if (item.finished) {
            return <TodoTask task={item} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TodoTasks;
