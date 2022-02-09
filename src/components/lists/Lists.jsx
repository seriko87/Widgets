import React, { useContext } from 'react';
import './lists.css';

import { addRemoveList } from '../../context/ApiCalls';
import { GlobalContext } from '../../context/GlobalContext';
import { useAuthState } from '../../firebase';
import LockIcon from '@mui/icons-material/Lock';

const Lists = ({ item, setAlert }) => {
  const { dispatch } = useContext(GlobalContext);
  const { currentUser } = useAuthState();

  const listName = item.name;
  const widgetUserAllow = item.user;
  const icon = item.icon;

  const handleChange = (id) => {
    addRemoveList(id, dispatch);
  };

  return (
    <>
      {widgetUserAllow ? (
        currentUser ? (
          <button className="listWrap" onClick={() => handleChange(item.id)}>
            <span className="iconWrapList">
              {icon}
              <div className="widgetTitle">{listName}</div>
            </span>

            {item.status ? (
              <div className="listOnBtn">On</div>
            ) : (
              <div className="listOffBtn">Off</div>
            )}
          </button>
        ) : (
          <button className="listWrap" onClick={() => setAlert(true)}>
            <span className="iconWrapList">
              {icon}
              <div className="widgetTitle">{listName}</div>
            </span>
            <div className="listOnBtn">
              <LockIcon />
            </div>
          </button>
        )
      ) : (
        <button className="listWrap" onClick={() => handleChange(item.id)}>
          <span className="iconWrapList">
            {icon}
            <div className="widgetTitle">{listName}</div>
          </span>
          {item.status ? (
            <div className="listOnBtn">On</div>
          ) : (
            <div className="listOffBtn">Off</div>
          )}
        </button>
      )}
    </>
  );
};

export default Lists;
