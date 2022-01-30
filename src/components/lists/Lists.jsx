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
    <button className="listWrap">
      <div className="widgetTitle">{listName}</div>

      <Switch
        {...label}
        className="switchList"
        checked={item.status}
        onChange={() => handleChange(item.id)}
      />
    </button>
  );
};

export default Lists;
