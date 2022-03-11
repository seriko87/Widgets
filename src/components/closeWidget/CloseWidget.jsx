import React from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './closeWidget.css';
import { useDispatch } from 'react-redux';
import { addRemoveWidget } from '../../redux/features/widgetList/widgetListSlice';

const CloseWidget = ({ id }) => {
  const dispatch = useDispatch();
  const handleChange = (id) => {
    dispatch(addRemoveWidget(id));
  };
  return (
    <div className="closeWidgetCont" onClick={() => handleChange(id)}>
      <CloseOutlinedIcon className="closeWidget" />
    </div>
  );
};

export default CloseWidget;
