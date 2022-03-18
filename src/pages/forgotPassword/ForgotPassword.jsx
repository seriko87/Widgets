import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { sendPassReset } from '../../firebase';
import './forgotPassword.css';
import { emailValidation } from '../register/Validation';

const ForgotPassword = () => {
  const [email, setEmail] = useState({ value: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailCorrect, setIsEmailCorrect] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (emailValidation(email.value)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email]);

  const handleSendReset = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage('');
      setError('');
      await sendPassReset(email.value);
      setEmail({ value: '' });
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setError('Failed to reset password');
      console.log(error);
    }

    setLoading(false);

    // navigate('/', { replace: true });
  };

  return (
    <div className="authMainCont">
      <div className="forgotPassContainer">
        <div className="forgotPassHeader">
          <div className="forgotPassTitle">Password Reset</div>
        </div>

        <form action="" className="authForm">
          {error && <div className="authError">{error}</div>}
          {message && <div className="authSuccesMessage">{message}</div>}
          <div className="inputEmail">
            <EmailOutlinedIcon className="emailIcons" />

            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              className="forgotInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setEmail({ value: e.target.value });
              }}
              value={email.value}
            />
          </div>

          <button
            className="handleSendReset"
            onClick={(e) => handleSendReset(e)}
            disabled={loading || emailCorrect ? false : true}
          >
            {loading ? 'Sending email...' : 'Reset Password '}
          </button>
          <div className="authLinkInfo">
            <Link to="/login" className="goLogIn">
              Login
            </Link>
          </div>
          <div className="authLinkInfo">
            Need account?{' '}
            <Link to="/signup" className="goLogIn">
              Sign up
            </Link>
          </div>
        </form>

        <div className="reCaptchaInfo">
          <div>
            This site is protected by reCAPTCHA and the Google{' '}
            <a
              href="https://policies.google.com/privacy?hl=en"
              className="goLogIn"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="https://policies.google.com/terms?hl=en"
              className="goLogIn"
            >
              Terms of Service
            </a>{' '}
            apply
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
