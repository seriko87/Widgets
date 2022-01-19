import './login.css';
import { useState, useEffect } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login, useAuthState } from '../../firebase';

import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passVisStatus, setPassVisStatus] = useState(false);
  const [loginErr, setLoginErr] = useState(true);

  const handleVisPass = () => {
    setPassVisStatus(!passVisStatus);
  };

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    await login(email, password)
      .then(() => {
        console.log('passed');
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setLoginErr(true);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     setLoginErr(false);
  //   }, 10000);
  //   return () => {
  //     clearTimeout(interval);
  //   };
  // }, [loginErr]);

  return (
    <div className="signUpContainer">
      <div className="signUpHeader">
        <div className="signUpTitle">Login</div>
        <div className="logInInfo">
          Don't have an account?{' '}
          <Link to="/signup" className="goLogIn">
            Sign Up
          </Link>
        </div>
      </div>

      <form className="authForm">
        <div className="inputEmail">
          <EmailOutlinedIcon className="signUpIcons" />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            className="signUpInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="inputPassword">
          <LockOutlinedIcon className="signUpIcons" />
          <label htmlFor="password">Password</label>
          <input
            type={passVisStatus ? 'text' : 'password'}
            name="password"
            className="signUpInput"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!passVisStatus ? (
            <VisibilityIcon
              className="visibility"
              onClick={() => handleVisPass()}
            />
          ) : (
            <VisibilityOffIcon
              className="visibility"
              onClick={() => handleVisPass()}
            />
          )}
        </div>
        <Link to="/forgot-password" className="forgotPassLink">
          Forgot Password?
        </Link>
        {loginErr && <div className="invalidCred">Invalid Credentials!!!</div>}
        <button
          className="signUpCreate"
          onClick={handleLogin}
          disabled={password || email ? false : true}
        >
          {loading ? 'Logging...' : 'Log in'}
        </button>
      </form>

      <div className="signUpInfo">
        <div>
          This site is protected by reCAPTCHA and the Google <br />
          <a
            href="https://policies.google.com/privacy?hl=en"
            className="goLogIn"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms?hl=en" className="goLogIn">
            Terms of Service
          </a>{' '}
          apply
        </div>
      </div>
    </div>
  );
};
export default Login;
