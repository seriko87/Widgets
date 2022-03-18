import React from 'react';

function TabPanel(props) {
  const { children, value, index, className } = props;

  return (
    <div role="tabpanel" className={className} hidden={value !== index}>
      {value === index && { children }}
    </div>
  );
}

export default TabPanel;
