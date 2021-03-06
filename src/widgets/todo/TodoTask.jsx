import React from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDispatch } from 'react-redux';
import { removeTask, taskComplete } from '../../redux/features/todo/todoSlice';
import Checkbox from '@mui/material/Checkbox';

const TodoTask = ({ task, listIndex }) => {
  const dispatch = useDispatch();
  const { taskId, text, finished } = task;

  const handleDel = () => {
    dispatch(removeTask([taskId, listIndex]));
  };

  return (
    <div key={taskId} className="todo-task-items">
      <span>
        <Checkbox
          checked={finished}
          onChange={() => dispatch(taskComplete([taskId, listIndex]))}
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
