import React, { useContext } from 'react';
import './profile.css';
import { logout } from '../../firebase';
import Lists from '../lists/Lists';

import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Profile = ({ user, setProOpenClose }) => {
  const { list } = useContext(GlobalContext);

  const email = user && user.email;
  const name = user && user.displayName;
  const imgUrl =
    (user && user.photoURL) ||
    'https://firebasestorage.googleapis.com/v0/b/rapid-info-433c6.appspot.com/o/userImg%2FHTNHxmCPGLYBTFTy3DcUOURi1Fw1avat.png?alt=media&token=b48261ad-6dbe-401c-942b-7566f621aeb6';

  return (
    <div className="profileContainer">
      <button className="profileBtnHome" onClick={() => setProOpenClose(false)}>
        <CloseOutlinedIcon className="profileOpenCloseBtn" />
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
      <div className="contactLinkContainer">
        <a
          href="mailto:serdarash@gmail.com"
          className="contactLink"
          target="_blank"
          rel="noreferrer"
        >
          Contact
        </a>
        <a
          href="https://github.com/seriko87/rapid_info"
          target="_blank"
          rel="noreferrer"
          className="contactLink"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Profile;
