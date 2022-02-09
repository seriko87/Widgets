import React, { useContext } from 'react';
import './lists.css';

import { addRemoveList } from '../../context/ApiCalls';
import { GlobalContext } from '../../context/GlobalContext';
import { useAuthState } from '../../firebase';

const Lists = ({ item, setAlert }) => {
  const { dispatch } = useContext(GlobalContext);
  const { currentUser } = useAuthState();

  const listName = item.name;
  const widgetUserAllow = item.user;

  const handleChange = (id) => {
    addRemoveList(id, dispatch);
  };

  return (
    <>
      {widgetUserAllow ? (
        currentUser ? (
          <button className="listWrap" onClick={() => handleChange(item.id)}>
            <div className="widgetTitle">{listName}</div>
            {item.status ? (
              <div className="listOnBtn">On</div>
            ) : (
              <div className="listOffBtn">Off</div>
            )}
          </button>
        ) : (
          <button className="listWrap" onClick={() => setAlert(true)}>
            <div className="widgetTitle">{listName}</div>
            {item.status ? (
              <div className="listOnBtn">On</div>
            ) : (
              <div className="listOffBtn">Off</div>
            )}
          </button>
        )
      ) : (
        <button className="listWrap" onClick={() => handleChange(item.id)}>
          <div className="widgetTitle">{listName}</div>
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
