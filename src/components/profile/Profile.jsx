import React, { useState } from 'react';
import './profile.css';
import { logout } from '../../firebase';
import Lists from '../lists/Lists';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import { iconList } from '../../redux/features/widgetList/widgetList';
import { useSelector } from 'react-redux';
import { widgets } from '../../redux/features/widgetList/widgetListSlice';

const Profile = ({ user, setProOpenClose }) => {
  const [alert, setAlert] = useState(false);
  const list = useSelector(widgets);

  const navigate = useNavigate();
  const email = user && user.email;
  const name = user && user.displayName;

  let windowSize = window.innerWidth;

  const imgUrl =
    (user && user.photoURL) ||
    'https://firebasestorage.googleapis.com/v0/b/rapid-info-433c6.appspot.com/o/userImg%2FHTNHxmCPGLYBTFTy3DcUOURi1Fw1avat.png?alt=media&token=b48261ad-6dbe-401c-942b-7566f621aeb6';

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="profileContainer">
      <button
        className="profileBtnHome"
        onClick={() => setProOpenClose(false)}
        arial-label="Close sidebar"
      >
        <CloseOutlinedIcon className="profileOpenCloseBtn" />
      </button>
      <div className="profileWrap">
        {user ? (
          <>
            <img src={imgUrl} alt="Profile" className="profilePic" />
            <div className="profileInfo">
              <span className="">{name ? name : 'Your Name'}</span>
              <span>{email}</span>
            </div>
          </>
        ) : (
          <div>
            <Link to="/">
              <h1 className="profileTitle">Widgets</h1>
            </Link>
          </div>
        )}
        {windowSize < 780 && (
          <span style={{ fontSize: '12px', textAlign: 'center' }}>
            (Small screen detected, please use big screen device!)
          </span>
        )}
      </div>

      <div
        className="listsContainer"
        style={user ? { height: '45vh' } : { height: '60vh' }}
      >
        {alert ? (
          <div className="loginAlert">
            <div className="alertMessageLogin">
              Please log in first to try this widget!
            </div>
            <div className="alertBtnWrap">
              <button onClick={() => setAlert(false)} className="loginAlertCnl">
                Cancel
              </button>
              <button
                onClick={() => navigate('/login', { replace: true })}
                className="loginAlertLogin"
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <>
            {list?.map((item, index) => {
              return (
                <Lists
                  key={item.id}
                  item={item}
                  setAlert={setAlert}
                  icon={iconList.filter((icon) => icon.id === item.id)[0].icon}
                />
              );
            })}
          </>
        )}
      </div>
      {user && (
        <div className="profileBtnWrap">
          <>
            <Link to="/update-profile" className="editProfileBtn">
              Edit profile
            </Link>
            <button onClick={handleLogout} className="logoutBtn">
              Log out
            </button>
          </>
        </div>
      )}
      <div className="contactLinkContainer">
        <a
          href="mailto:sashyr.dev@gmail.com"
          className="contactLink"
          target="_blank"
          rel="noreferrer"
        >
          <MailOutlineIcon />
        </a>
        <a
          href="https://github.com/seriko87/rapid_info"
          target="_blank"
          rel="noreferrer"
          className="contactLink"
        >
          <GitHubIcon />
        </a>
      </div>
    </div>
  );
};

export default Profile;
