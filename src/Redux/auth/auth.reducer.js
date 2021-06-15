import {
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    TOAST,
    TOASTNULL,
    LOGINERROR,
    REGISTERERROR
  } from './auth.type';


import axios from 'axios';
 



const initialAuthState = {
    user: {
      username: "",
      expires_at: "",
      token: "", 
    },
    isAuthenticated: false,
    isLoading: false,
    error: ''
  }

  const getAuthState = () => {
    const auth = localStorage.getItem("auth");
    try {
      const authobj = JSON.parse(auth);
      const { expires_at, token } = authobj;
      const now = new Date(Date.now());

      console.log("TIME" , now , "EXPIRES AT", new Date(expires_at))

       if (new Date(expires_at) > now) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const newAuthState = {
          user : authobj, 
          isAuthenticated: true,
          isLoading: false,
          error: ''         
        };
        console.log("updated state")
        return newAuthState;
      } else{
        console.log("removed")
        localStorage.removeItem("auth");
        // return(
        //  {
        //   user : {},
        //   isAuthenticated : false,
        //   isLoading : false,
        //   error : ''
        // })

       }
      

      return initialAuthState;
    } catch (error) {
      console.log(error);
      return initialAuthState;
    }
  };


  const newAuth = getAuthState();

  export default function authReducer(state = newAuth, action) {
 
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true,
          error: null,
        };

      case LOGIN_SUCCESS:
        
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${action.payload.data.token}`;

        localStorage.setItem("auth", JSON.stringify(action.payload.data));

        return {
          ...state,
          user :action.payload.data,
          isLoading: false,
          isAuthenticated: true,         
          error: action.payload.status
        };
      case REGISTER_SUCCESS:       
                
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${action.payload.data.token}`;

        localStorage.setItem("auth", JSON.stringify(action.payload.data));

        return {
          ...state,
          user : action.payload.data,
          isLoading: false,
          isAuthenticated: true,             
          error: action.payload.status
        };


      case LOGOUT_SUCCESS:
        localStorage.removeItem("auth");
        return {
          ...state,
          user : {  },
          isLoading: false,
          isAuthenticated: false,             
         
        };

      case LOGINERROR:
        alert(action.payload)
        return {
          ...state,
          isLoading: false,
          error: 400
        }
      case REGISTERERROR:
        alert(action.payload)
        return {
          ...state,
          isLoading: false,
          error: 400
        }
      default:
        return state;
    }
  }