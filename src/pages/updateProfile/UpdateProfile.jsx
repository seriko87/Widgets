import React, { useState, useRef, useEffect } from 'react';
import { useAuthState } from '../../firebase';
import './updateProfile.css';
import {
  passValidation,
  passText,
  emailValidation,
} from '../register/Validation';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PasswordContainer from '../register/PasswordText';

const UpdateProfile = () => {
  const { currentUser } = useAuthState();
  const email = currentUser?.email;
  const name = currentUser?.displayName || '';
  const mobile = currentUser?.phoneNumber || '';
  const imgUrl =
    currentUser?.photoUrl ||
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/240px-Missing_avatar.svg.png';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef();
  const passRef = useRef();
  const mobileRef = useRef();
  const nameRef = useRef();
  const [password, setPassword] = useState('');
  const [passCorrect, setPassCorrect] = useState(false);
  const [passVisStatus, setPassVisStatus] = useState(false);
  const [hasFocus, setFocus] = useState(false);
  const [emailCorrect, setIsEmailCorrect] = useState(false);

  useEffect(() => {
    if (
      document.hasFocus() &&
      passRef.current.contains(document.activeElement)
    ) {
      setFocus(true);
    }
  }, []);

  useEffect(() => {
    if (emailValidation(email)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email]);

  const handleVisPass = () => {
    setPassVisStatus(!passVisStatus);
  };

  const handleUpdate = () => {};
  const handleCancel = () => {};
  useEffect(() => {
    if (passValidation(password)) {
      setPassCorrect(true);
    } else {
      setPassCorrect(false);
    }
  }, [password]);

  return (
    <div className="updateProfileContainer">
      <img src={imgUrl} alt="Profile" className="updateProfilePic" />
      <form className="updateProfileWrap">
        <div className="inputWrapProfile">
          <label htmlFor="name">Name: </label>
          <input
            defaultValue={name}
            className="updateProfileInput"
            name="name"
            type="text"
            id="name"
            ref={nameRef}
          />
        </div>
        <div className="inputWrapProfile">
          <label htmlFor="email">E-mail: </label>
          <input
            defaultValue={email}
            className="updateProfileInput"
            name="email"
            type="email"
            id="email"
            ref={emailRef}
          />
        </div>
        <div className="inputWrapProfile">
          <label htmlFor="mobile">Mobile: </label>
          <input
            defaultValue={mobile}
            className="updateProfileInput"
            name="mobile"
            type="tel"
            id="mobile"
            ref={mobileRef}
          />
        </div>
        <div className="inputWrapProfile">
          <label htmlFor="password">Password: </label>
          <input
            placeholder="Leave blank to keep the same"
            className="updateProfileInput"
            name="password"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setPassword(e.target.value)}
            ref={passRef}
            type={passVisStatus ? 'text' : 'password'}
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
            <div className="passUpdateInfo">
              <div className="triangle"></div>
              {passText.map((item, index) => {
                return (
                  <PasswordContainer pass={password} item={item} key={index} />
                );
              })}
            </div>
          ) : null}
        </div>
      </form>
      <div className="updateBtnWrap">
        <button
          className="updateProfileBtn"
          onClick={handleUpdate}
          disabled={loading || emailCorrect ? false : true}
        >
          {loading ? 'Sending email...' : 'Update'}
        </button>
        <button className="cancelProfileBtn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
