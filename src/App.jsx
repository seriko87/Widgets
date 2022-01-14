import './App.css';
import { useEffect } from 'react';
import DarkModeToggle from './components/darkMode/DarkModeToggle';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/register/SignUp';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useAuthState } from './firebase';

function App() {
  const userr = useAuthState();
  const user = JSON.parse(localStorage.getItem('user')) || userr;

  console.log(user);
  return (
    <div className="App">
      <DarkModeToggle />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
