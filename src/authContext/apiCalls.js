// import {
//   loginFailure,
//   loginStart,
//   loginSuccess,
//   logout,
//   signupFailure,
//   signupSuccess,
// } from './AuthActions';
// import { signup, login } from '../firebase';

// export const LoginFirebase = async (user, dispatch) => {
//   const { email, password } = user;

//   try {
//     await login(email, password);
//     console.log('here');
//   } catch (error) {
//     dispatch(loginFailure());
//   }
// };

// export const SignUpFirebase = async (user, dispatch) => {
//   try {
//     await signup(user);
//     dispatch(signupSuccess());
//   } catch (error) {
//     dispatch(signupFailure());
//   }
// };

// export const logoutFirebase = (dispatch) => {
//   dispatch(logout());
// };
