import React from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDispatch } from 'react-redux';
import { removeTask } from '../../redux/features/todo/todoSlice';

const TodoTask = ({ task }) => {
  const dispatch = useDispatch();
  const { id, text, finished } = task;

  const handleDel = () => {
    dispatch(removeTask(id));
  };
  return (
    <div key={id} className="todo-task-items">
      <input type="checkbox" />
      {text}
      <DeleteForeverOutlinedIcon
        onClick={handleDel}
        className="todo-task-delete"
      />
    </div>
  );
};

export default TodoTask;
