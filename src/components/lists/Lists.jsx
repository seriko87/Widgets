import './lists.css';
import { useDispatch } from 'react-redux';
import { addRemoveWidget } from '../../redux/features/widgetList/widgetListSlice';
import { useAuthState } from '../../firebase';
import LockIcon from '@mui/icons-material/Lock';

const Lists = ({ item, setAlert, icon }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuthState();

  const listName = item.name;
  const widgetUserAllow = item.user;

  const handleChange = (id) => {
    dispatch(addRemoveWidget(id));
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
