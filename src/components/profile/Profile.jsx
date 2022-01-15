import React, { useContext } from 'react';
import './profile.css';
import { logout } from '../../firebase';
import Lists from '../lists/Lists';
import { widgetList } from '../../widgetList';
import { GlobalContext } from '../../context/GlobalContext';

const Profile = ({ user }) => {
  const { list } = useContext(GlobalContext);

  const email = user.email;
  const name = user.displayName;
  const imgUrl =
    user.photoUrl ||
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

      <button onClick={logout} className="logoutBtn">
        Log out
      </button>
    </div>
  );
};

export default Profile;
