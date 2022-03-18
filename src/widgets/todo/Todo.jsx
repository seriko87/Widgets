import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import './todo.css';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import { useSelector, useDispatch } from 'react-redux';
import {
  todoLists,
  addList,
  removeList,
  renameList,
} from '../../redux/features/todo/todoSlice';
import TodoTasks from './TodoTasks';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddIcon from '@mui/icons-material/Add';

const Todo = () => {
  const taskList = useSelector(todoLists);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabEditIndex, setTabEditIndex] = useState(null);
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');

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
  const handleListNameEdit = (index) => {
    dispatch(renameList([index, listName]));
    setListName('');
    setTabEditIndex(null);
  };
  return (
    <Draggable handle="strong">
      <div className="widgetContainer box no-cursor">
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
            <div className="todo-label-container">
              <span>Task Group</span>
              <button className="btn-add-group" onClick={addNewNote}>
                <AddIcon fontSize="small" />
              </button>
            </div>
            <div className="task-group-container">
              {taskList.map((item, index) => {
                return (
                  <div>
                    {tabEditIndex === index ? (
                      <span className="todo-tab-wrap">
                        <input
                          type="text"
                          value={listName}
                          onChange={(e) => setListName(e.target.value)}
                        />{' '}
                        <button onClick={() => handleListNameEdit(index)}>
                          Save
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleTabChange(index)}
                        className={
                          tabIndex === index ? 'todo-tab active' : 'todo-tab'
                        }
                      >
                        <span>{item.name}</span>
                        <span
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="grey"
                            width={'18px'}
                            onClick={() => {
                              setTabEditIndex(index);
                              setListName(item.name);
                            }}
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          <DeleteForeverOutlinedIcon
                            onClick={() => handleDeleteList(item.listId)}
                            className="todo-task-delete"
                            fontSize="small"
                          />
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
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
