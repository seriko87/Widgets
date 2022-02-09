import './App.css';

import DarkModeToggle from './components/darkMode/DarkModeToggle';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/register/SignUp';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useAuthState } from './firebase';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import UpdateProfile from './pages/updateProfile/UpdateProfile';
import Main from './pages/main/Main';
import Error from './pages/404/Error';

function App() {
  const { currentUser, loadingUser } = useAuthState();

  return (
    <div className="App">
      <DarkModeToggle />
      {!loadingUser && (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="home" element={<Home />} />
          <Route
            path="signup"
            element={!currentUser ? <SignUp /> : <Navigate to="/home" />}
          />
          <Route
            path="login"
            element={!currentUser ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="forgot-password"
            element={
              !currentUser ? <ForgotPassword /> : <Navigate to="/home" />
            }
          />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
