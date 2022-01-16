import './App.css';
import { useEffect } from 'react';
import DarkModeToggle from './components/darkMode/DarkModeToggle';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/register/SignUp';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useAuthState } from './firebase';

function App() {
  const { currentUser, loadingUser } = useAuthState();
  // const user = JSON.parse(localStorage.getItem('user')) || null;
  console.log(currentUser, loadingUser);

  return (
    <div className="App">
      <DarkModeToggle />

      {!loadingUser && (
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/signup"
            element={!currentUser ? <SignUp /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!currentUser ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
