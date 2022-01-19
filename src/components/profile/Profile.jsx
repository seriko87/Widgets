import React, { useContext, useState } from 'react';
import './profile.css';
import { logout } from '../../firebase';
import Lists from '../lists/Lists';
import { useAuthState } from '../../firebase';
import { widgetList } from '../../widgetList';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Profile = ({ user, setProOpenClose }) => {
  const { list } = useContext(GlobalContext);

  const email = user && user.email;
  const name = user && user.displayName;
  const imgUrl =
    (user && user.photoURL) ||
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/240px-Missing_avatar.svg.png';

  return (
    <div className="profileContainer">
      <button className="profileBtnHome" onClick={() => setProOpenClose(false)}>
        <CloseOutlinedIcon style={{ height: '30px' }} />
      </button>
      <div className="profileWrap">
        <img src={imgUrl} alt="Profile" className="profilePic" />
        <div className="profileInfo">
          <span className="">{name ? name : 'Edit your name'}</span>
          <span>{email}</span>
        </div>
      </div>

      <div className="listsContainer">
        {list.map((item) => {
          return <Lists key={item.id} item={item} />;
        })}
      </div>
      <div className="profileBtnWrap">
        <Link to="/update-profile" className="editProfileBtn">
          Edit profile
        </Link>
        <button onClick={logout} className="logoutBtn">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
