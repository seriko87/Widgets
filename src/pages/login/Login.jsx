import './login.css';
import { useEffect, useState, useRef } from 'react';
import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import { login } from '../../firebase';

import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passVisStatus, setPassVisStatus] = useState(false);
  const [loginErr, setLoginErr] = useState(false);

  const ref = useRef();
  const handleVisPass = () => {
    setPassVisStatus(!passVisStatus);
  };

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      setLoginErr(true);
      alert('here');
      console.log(error);
    }

    setLoading(false);
    navigate('/', { replace: true });
  };

  return (
    <div className="signUpContainer">
      <div className="signUpHeader">
        <div className="signUpTitle">Log in</div>
        <div className="logInInfo">
          Don't have an account?{' '}
          <Link to="/signup" className="goLogIn">
            Sign Up
          </Link>
        </div>
      </div>

      <form action="">
        <div className="inputEmail">
          <EmailOutlined
            className="signUpIcons"
            // style={emailCorrect ? { color: 'rgb(13, 124, 13)' } : {}}
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            className="signUpInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputPassword">
          <LockOutlined
            className="signUpIcons"
            // style={passCorrect ? { color: 'rgb(13, 124, 13)' } : {}}
          />
          <label htmlFor="password">Password</label>
          <input
            type={passVisStatus ? 'text' : 'password'}
            name="password"
            className="signUpInput"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            ref={ref}
          />
          {!passVisStatus ? (
            <Visibility
              className="visibility"
              onClick={() => handleVisPass()}
            />
          ) : (
            <VisibilityOff
              className="visibility"
              onClick={() => handleVisPass()}
            />
          )}
        </div>
        {loginErr && <div className="invalidCred">Invalid Credentials!!!</div>}
        <button
          className="signUpCreate"
          onClick={handleLogin}
          disabled={password || email ? false : true}
        >
          {loading ? 'Logging...' : 'Log in'}
        </button>
      </form>
      {/* {response && (
        <label> Chloek123.
          Output:
          <br />
          <pre>{JSON.stringify(response, undefined, 2)}</pre>
        </label>
      )} */}
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
