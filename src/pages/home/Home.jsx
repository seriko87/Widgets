import './home.css';
import { useContext } from 'react';
import Profile from '../../components/profile/Profile';
import { useAuthState } from '../../firebase';
import { GlobalContext } from '../../context/GlobalContext';

function Home() {
  const { user, list } = useContext(GlobalContext);

  return (
    <div className="container">
      <Profile user={user} />
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
