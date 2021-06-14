import axios from 'axios';

import { userLogin, userRegister } from '../../Api/api.user'

import {
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,   
    LOGINERROR,
    REGISTERERROR
  } from './auth.type';
  


  

export const loading = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });
};

// Login User

export const login = (email, password, history) => (dispatch) => {
  // headers
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  // Body
  const body = JSON.stringify({
    email,
    password,
  });

  axios
    .post(userLogin, body, config)
    .then((response) => {
      if (response.data.status === 400) {
        dispatch({
          type: LOGINERROR,
          payload: response.data.msg
        });
  
   
      } else if (response.data.status === 200) {

        history.push('/')
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });     
   
      }
    })
    .catch((err) => {
      dispatch({
        type: LOGINERROR,
        payload: "Something went wrong!"
      });
 
    });
};

// LOGOUT

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });

};


  // registered users

  export const register = (username, email, password, password2, address, history) => (
    dispatch,
  ) => {
  
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
  
    const body = JSON.stringify({
      username,
      email,
      password,
      password2,
      address
    });
    axios
      .post(userRegister, body, config)
      .then((response) => {
        dispatch({
          type: USER_LOADING,
        });

        if (response.data.status === 400) {
          dispatch({
            type: REGISTERERROR,
            payload: response.data
          })
       
        } else if (response.data.status === 201) {
          history.push('/')
          dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data,
          });
     
        }
      })
      .catch((err) => {
        dispatch({
          type: REGISTERERROR,
          payload: {data: {msg: "Something went wrong!"}}
        })
   
        
      });
  };