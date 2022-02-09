import './signUp.css';
import { useEffect, useState, useRef } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { emailValidation, passValidation, passText } from './Validation';
import PasswordContainer from './PasswordText';
import { Link, useNavigate } from 'react-router-dom';
import { signup, useAuthState } from '../../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState(' ');
  const [loading, setLoading] = useState(false);
  const [emailCorrect, setIsEmailCorrect] = useState(false);
  const [passCorrect, setPassCorrect] = useState(false);
  const [formCorrect, setFormCorrect] = useState(false);
  const [hasFocus, setFocus] = useState(false);
  const [passVisStatus, setPassVisStatus] = useState(false);
  const [loginErr, setLoginErr] = useState(false);

  const ref = useRef();

  const user = useAuthState();

  useEffect(() => {
    if (emailValidation(email)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email]);

  useEffect(() => {
    if (passValidation(password)) {
      setPassCorrect(true);
    } else {
      setPassCorrect(false);
    }
  }, [password]);

  useEffect(() => {
    if (emailCorrect && passCorrect & (password === rePassword)) {
      setFormCorrect(true);
    } else {
      setFormCorrect(false);
    }
  }, [email, password, rePassword, emailCorrect]);

  useEffect(() => {
    if (document.hasFocus() && ref.current.contains(document.activeElement)) {
      setFocus(true);
    }
  }, []);

  const handleVisPass = () => {
    setPassVisStatus(!passVisStatus);
  };

  let navigate = useNavigate();
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(email, password);
    } catch (error) {
      console.log(error);
      setLoginErr(true);
    }
    setLoading(false);
    if (user) {
      navigate('/home', { replace: true });
    }
  };

  return (
    <div className="signUpMainCont">
      <div className="signUpContainer">
        <div className="signUpHeader">
          <div className="signUpTitle">Sign up</div>
          <div className="logInInfo">
            Already have an account?{' '}
            <Link to="/login" className="goLogIn">
              Log in
            </Link>
          </div>
        </div>

        <form action="" className="authForm">
          <div className="inputEmail">
            <EmailOutlinedIcon
              className="signUpIcons"
              style={emailCorrect ? { color: 'rgb(13, 124, 13)' } : {}}
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
            <LockOutlinedIcon
              className="signUpIcons"
              style={passCorrect ? { color: 'rgb(13, 124, 13)' } : {}}
            />
            <label htmlFor="password">Password</label>
            <input
              type={passVisStatus ? 'text' : 'password'}
              name="password"
              className="signUpInput"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              ref={ref}
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
            {hasFocus ? (
              <div className="passInfo">
                <div className="triangle"></div>
                {passText.map((item, index) => {
                  return (
                    <>
                      <PasswordContainer
                        pass={password}
                        item={item}
                        setPassCorrect={setPassCorrect}
                        key={index}
                      />{' '}
                    </>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="inputPassword">
            <LockOutlinedIcon
              className="signUpIcons"
              style={
                rePassword && password === rePassword
                  ? { color: 'rgb(13, 124, 13)' }
                  : {}
              }
            />
            <label htmlFor="passwordRepeat">Repeat Password</label>
            <input
              type={passVisStatus ? 'text' : 'password'}
              name="passwordRepeat"
              className="signUpInput"
              placeholder="Repeat Password"
              onChange={(e) => setRePassword(e.target.value)}
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
          {loginErr && <div className="invalidCred">User already exist!!!</div>}
          <button
            className="signUpCreate"
            onClick={handleCreate}
            disabled={formCorrect ? false : true}
          >
            {loading ? 'Submitting...' : 'Create an account'}
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
export default SignUp;
