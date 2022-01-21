import React, { useContext } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './closeWidget.css';
import { GlobalContext } from '../../context/GlobalContext';
import { addRemoveList } from '../../context/ApiCalls';

const CloseWidget = ({ id }) => {
  const { dispatch } = useContext(GlobalContext);
  const handleChange = (id) => {
    addRemoveList(id, dispatch);
  };
  return (
    <div className="closeWidgetCont" onClick={() => handleChange(id)}>
      <CloseOutlinedIcon className="closeWidget" />
    </div>
  );
};

export default CloseWidget;
