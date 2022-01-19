import './home.css';
import { useContext, useState } from 'react';
import Profile from '../../components/profile/Profile';
import { useAuthState } from '../../firebase';
import { GlobalContext } from '../../context/GlobalContext';

function Home() {
  const { list } = useContext(GlobalContext);
  const [proOpenClose, setProOpenClose] = useState(true);
  const { currentUser } = useAuthState();

  return (
    <div className="container">
      <div className="profileBtnHomeOpen" onClick={() => setProOpenClose(true)}>
        <img
          src={currentUser?.photoURL}
          alt="Profile"
          className="profile-picture"
        />
      </div>

      {proOpenClose && (
        <Profile user={currentUser} setProOpenClose={setProOpenClose} />
      )}

      {list.map((item) => {
        if (item.status) {
          return item.component;
        }
        return null;
      })}
    </div>
  );
}

export default Home;
