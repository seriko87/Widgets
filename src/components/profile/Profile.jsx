import React, { useContext, useState } from 'react';
import './profile.css';
import { logout } from '../../firebase';
import Lists from '../lists/Lists';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import { iconList } from '../../context/widgetList';

const Profile = ({ user, setProOpenClose }) => {
  const [alert, setAlert] = useState(false);
  const { list } = useContext(GlobalContext);
  const navigate = useNavigate();
  const email = user && user.email;
  const name = user && user.displayName;

  const imgUrl =
    (user && user.photoURL) ||
    'https://firebasestorage.googleapis.com/v0/b/rapid-info-433c6.appspot.com/o/userImg%2FHTNHxmCPGLYBTFTy3DcUOURi1Fw1avat.png?alt=media&token=b48261ad-6dbe-401c-942b-7566f621aeb6';

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="profileContainer">
      <button className="profileBtnHome" onClick={() => setProOpenClose(false)}>
        <CloseOutlinedIcon className="profileOpenCloseBtn" />
      </button>
      <div className="profileWrap">
        {user ? (
          <>
            <img src={imgUrl} alt="Profile" className="profilePic" />
            <div className="profileInfo">
              <span className="">{name ? name : 'Edit your name'}</span>
              <span>{email}</span>
            </div>
          </>
        ) : (
          <div>
            <Link to="/">
              <h1>Widgets</h1>
            </Link>
          </div>
        )}
      </div>

      <div
        className="listsContainer"
        style={user ? { height: '40vh' } : { height: '60vh' }}
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
            {list.map((item, index) => {
              return (
                <Lists
                  key={item.id}
                  item={item}
                  setAlert={setAlert}
                  icon={iconList[index].icon}
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
          href="mailto:serdarash@gmail.com"
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
