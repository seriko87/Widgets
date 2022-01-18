import React, { useContext } from 'react';
import './profile.css';
import { logout } from '../../firebase';
import Lists from '../lists/Lists';
import { useAuthState } from '../../firebase';
import { widgetList } from '../../widgetList';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
  const { list } = useContext(GlobalContext);
  console.log(user);
  const email = user && user.email;
  const name = user && user.displayName;
  const imgUrl =
    (user && user.photoURL) ||
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/240px-Missing_avatar.svg.png';

  return (
    <div className="profileContainer">
      <div className="profileWrap">
        <img src={imgUrl} alt="Profile" className="profilePic" />
        <span className="">{name ? name : 'Edit your name'}</span>
        <span>{email}</span>
      </div>

      <div className="listsContainer">
        {list.map((item) => {
          return <Lists key={item.id} item={item} />;
        })}
      </div>
      <Link to="/update-profile" className="logoutBtn">
        Edit profile
      </Link>
      <button onClick={logout} className="logoutBtn">
        Log out
      </button>
    </div>
  );
};

export default Profile;
