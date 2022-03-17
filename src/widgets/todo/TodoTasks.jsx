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
    <>
      <form action="" className="todo-form">
        <span className="todo-label">Add Note</span>
        <span>
          <input
            type="text"
            className={error ? 'todo-input todo-error' : 'todo-input'}
            value={note}
            onChange={handleChange}
          />
          <button className="btn-add" onClick={handleSubmit}>
            add
          </button>
        </span>
      </form>
      <div className="task-task-container">
        <span className="todo-label">Active</span>
        {taskArray.map((item) => {
          if (!item.finished) {
            return <TodoTask task={item} listIndex={listIndex} />;
          }
          return null;
        })}
        <span className="todo-label">Finished</span>
        {taskArray.map((item) => {
          if (item.finished) {
            return <TodoTask task={item} listIndex={listIndex} />;
          }
          return null;
        })}
      </div>
    </>
  );
};

export default TodoTasks;
