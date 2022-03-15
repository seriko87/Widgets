import React from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDispatch } from 'react-redux';
import { removeTask, taskComplete } from '../../redux/features/todo/todoSlice';
import Checkbox from '@mui/material/Checkbox';

const TodoTask = ({ task }) => {
  const dispatch = useDispatch();
  const { id, text, finished } = task;

  const handleDel = () => {
    dispatch(removeTask(id));
  };

  return (
    <div key={id} className="todo-task-items">
      <span>
        <Checkbox
          checked={finished}
          onChange={() => dispatch(taskComplete(id))}
          className="todo-checkbox"
        />

        <span className={finished ? 'todo-task-finished' : undefined}>
          {text}
        </span>
      </span>

      <DeleteForeverOutlinedIcon
        onClick={handleDel}
        className="todo-task-delete"
      />
    </div>
  );
};

export default TodoTask;
