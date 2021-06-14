import axios from "axios";
import { fetchUsersData } from '../../Api/api.user'
import
 { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } 
 from './users.types';

 export const fetchUsers = () => {

    return (dispatch) => {

        dispatch({ type : FETCH_USERS_REQUEST})
        axios
        .get(fetchUsersData)
        .then(response => {

            const users = response.data;
            // console.log(users)
            dispatch({type : FETCH_USERS_SUCCESS,
                    payload :    users
            })
        })
        .catch(error => {
            dispatch({type : FETCH_USERS_FAILURE , payload : error})
        })
    }
 }
