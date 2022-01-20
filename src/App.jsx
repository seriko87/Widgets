import './App.css';

import DarkModeToggle from './components/darkMode/DarkModeToggle';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/register/SignUp';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useAuthState } from './firebase';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import UpdateProfile from './pages/updateProfile/UpdateProfile';

function App() {
  const { currentUser, loadingUser } = useAuthState();

  return (
    <div className="App">
      <DarkModeToggle />
      {!loadingUser && (
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Home /> : <Navigate to="/signup" />}
          />
          <Route
            path="signup"
            element={!currentUser ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="login"
            element={!currentUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="forgot-password"
            element={!currentUser ? <ForgotPassword /> : <Navigate to="/" />}
          />
          <Route path="update-profile" element={<UpdateProfile />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
