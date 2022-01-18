// Import th functions you need from the SDKs you need
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  deleteUser,
  updateProfile,
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const SITE_KEY = process.env.REACT_APP_SITE_KEY;

const firebaseConfig = {
  apiKey: 'AIzaSyDKKMczB_chKQcox_BSslg92S7UY9svupE',
  authDomain: 'rapid-info-433c6.firebaseapp.com',
  projectId: 'rapid-info-433c6',
  storageBucket: 'rapid-info-433c6.appspot.com',
  messagingSenderId: '1023308131035',
  appId: '1:1023308131035:web:4a0a2467c34f3af0d2fafe',
  measurementId: 'G-SLLQD0Z610',
};
// const {
//   initializeAppCheck,
//   ReCaptchaV3Provider,
// } = require('firebase/app-check');

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(SITE_KEY),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true,
// });

const analytics = getAnalytics(app);

const auth = getAuth();
const storage = getStorage();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function logout() {
  return signOut(auth);
}

export function updateUserEmail(email) {
  return updateEmail(auth.currentUser, email);
}

export function updadateUserPassword(password) {
  return updatePassword(auth.currentUser, password);
}
export function deleteAccoutn() {
  return deleteUser(auth.currentUser);
}
export function sendPassReset(email) {
  return sendPasswordResetEmail(auth, email);
}
export function updateUserProfile(currentUser, name) {
  return updateProfile(currentUser, { displayName: name });
}

export function useAuthState() {
  const [currentUser, setCurrentUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingUser(false);
    });
    return unsub;
  }, []);
  return { currentUser, loadingUser };
}

//storage functions
export async function uploadPhoto(file, currentUser, setLoading, setNewPhoto) {
  const fileRef = ref(storage, 'userImg/' + currentUser.uid + file.name);

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL });
  setLoading(false);

  alert('file uploaded');
  setNewPhoto(photoURL);
}
