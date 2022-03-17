import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import './todo.css';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import { useSelector, useDispatch } from 'react-redux';
import {
  todoLists,
  addList,
  removeList,
} from '../../redux/features/todo/todoSlice';
import TabPanel from '../../components/tabPanel/TabPanel';
import TodoTasks from './TodoTasks';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const Todo = () => {
  const taskList = useSelector(todoLists);
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskList.length === 0) {
      dispatch(addList());
    }
  }, []);
  const handleTabChange = (newValue) => {
    setTabIndex(newValue);
  };

  const addNewNote = () => {
    dispatch(addList());
  };

  const handleDeleteList = (id) => {
    dispatch(removeList(id));
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
              return (
                <button
                  onClick={() => handleTabChange(index)}
                  className={
                    tabIndex === index ? 'todo-tab active' : 'todo-tab'
                  }
                >
                  {item.name}
                  <DeleteForeverOutlinedIcon
                    onClick={() => handleDeleteList(item.listId)}
                    className="todo-task-delete"
                  />
                </button>
              );
            })}
            <button className="btn-add-category" onClick={addNewNote}>
              Add New Note
            </button>
          </aside>

          {taskList.map((item, index) => {
            return (
              <div
                role="tabpanel"
                className="todo-tab-content"
                hidden={tabIndex !== index}
              >
                {tabIndex === index && (
                  <TodoTasks tasks={item} listIndex={index} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Draggable>
  );
};

export default Todo;
