import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer' 
import fetchUserReducer from './fetch-users/users.reducers';


const rootReducer = combineReducers({
   authReducer ,
   fetchUserReducer
});

export default rootReducer
