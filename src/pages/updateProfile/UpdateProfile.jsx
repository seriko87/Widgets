import React, { useState, useRef, useEffect } from 'react';
import {
  useAuthState,
  uploadPhoto,
  updateUserEmail,
  updateUserProfile,
  updadateUserPassword,
} from '../../firebase';
import './updateProfile.css';
import {
  passValidation,
  passText,
  emailValidation,
} from '../register/Validation';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PasswordContainer from '../register/PasswordText';
import { useNavigate } from 'react-router-dom';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

const UpdateProfile = () => {
  const { currentUser } = useAuthState();
  const email = currentUser?.email;
  const name = currentUser?.displayName;
  const passRef = useRef();

  const [newPhoto, setNewPhoto] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/240px-Missing_avatar.svg.png'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const emailRef = useRef();

  const [userName, setUserName] = useState(name);
  const [password, setPassword] = useState('');
  const [passCorrect, setPassCorrect] = useState(false);
  const [passVisStatus, setPassVisStatus] = useState(false);
  const [hasFocus, setFocus] = useState(false);
  const [emailCorrect, setIsEmailCorrect] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [tempPhoto, setTempPhoto] = useState();

  const navigate = useNavigate();
  console.log(userName);

  console.log(currentUser);
  //email validation
  useEffect(() => {
    if (emailValidation(email)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email]);

  // password Validation
  useEffect(() => {
    if (passValidation(password)) {
      setPassCorrect(true);
    } else {
      setPassCorrect(false);
    }
  }, [password]);

  useEffect(() => {
    if (
      document.hasFocus() &&
      passRef.current.contains(document.activeElement)
    ) {
      setFocus(true);
    }

    setUserName(currentUser?.displayName);
  }, []);

  const handleVisPass = () => {
    setPassVisStatus(!passVisStatus);
  };

  // update functions
  useEffect(() => {
    if (currentUser?.photoURL) {
      setNewPhoto(currentUser.photoURL);
    }
  }, [currentUser]);

  const handleUpdate = () => {
    setMessage('');
    if (photo) {
      uploadPhoto(photo, currentUser, setLoading, setNewPhoto);
      console.log('photo updated');
    }

    if (email !== currentUser.email) {
      updateUserEmail(email);
      console.log('email updated');
    }

    if (userName !== currentUser.displayName) {
      updateUserProfile(currentUser, userName);
      console.log('Name updated', [userName, currentUser.displayName]);
    }

    if (password !== null) {
      if (passCorrect) {
        updadateUserPassword(password);
      } else {
        setError('Please Enter Valid Password');
      }
      console.log(password);
    }

    setMessage('Profile Updated!!!');
  };
  const handleCancel = () => {
    navigate('/', { replace: true });
  };
  const handleChangeFile = (e) => {
    setPhoto(e.target.files[0]);
    setTempPhoto(URL.createObjectURL(e.target.files[0]));
  };
  console.log(password);

  return (
    <div className="updateProfileContainer">
      <div className="updateContainer">
        <div className="updateProfileTitle">Edit Profile</div>
        <div className="updateProfPic">
          <label class="updatePicIcon">
            <input
              type="file"
              accept=".jpg,.jpeg,.png, .webp"
              className="custom-file-icon"
              onChange={handleChangeFile}
            />
            <PhotoCameraOutlinedIcon className="photoAddIcon" />
          </label>

          <img
            src={tempPhoto ? tempPhoto : newPhoto}
            alt="Profile"
            className="updateProfilePic"
          />
        </div>
      </div>

      <form className="updateProfileWrap">
        <div className="inputWrapProfile">
          <label htmlFor="name">Name: </label>
          <input
            defaultValue={name}
            className="updateProfileInput"
            name="name"
            type="text"
            id="name"
            onChange={(e) => setUserName(e.target.value)}
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
          <label htmlFor="password">Password: </label>
          <input
            placeholder="Leave blank to keep the same"
            className="updateProfileInput"
            name="password"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setPassword(e.target.value)}
            type={passVisStatus ? 'text' : 'password'}
            ref={passRef}
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
        {error && <div className="profileUpdateError">{error}</div>}
        {message && <div className="profileSuccesMessage">{message}</div>}
      </form>
      <div className="updateBtnWrap">
        <button
          className="updateProfileBtn"
          onClick={handleUpdate}
          disabled={loading || emailCorrect ? false : true}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button className="cancelProfileBtn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
