import React, { useContext } from 'react';
import './lists.css';
import Switch from '@mui/material/Switch';
import { addRemoveList } from '../../context/ApiCalls';
import { GlobalContext } from '../../context/GlobalContext';

const Lists = ({ item }) => {
  const { dispatch } = useContext(GlobalContext);

  const listName = item.name;
  const label = { inputProps: { 'aria-label': 'Widget Added Status' } };

  const handleChange = (id) => {
    addRemoveList(id, dispatch);
  };

  return (
    <button className="listWrap" onClick={() => handleChange(item.id)}>
      <div className="widgetTitle">{listName}</div>

      {/* <Switch
        {...label}
        className="switchList"
        checked={item.status}
        onChange={() => handleChange(item.id)}
      /> */}

      {item.status ? (
        <div className="listOnBtn">On</div>
      ) : (
        <div className="listOffBtn">Off</div>
      )}
    </button>
  );
};

export default Lists;
