import {
FETCH_USERS_SUCCESS,
FETCH_USERS_REQUEST,
FETCH_USERS_FAILURE
} from './users.types'

const initialState = {
    loading : false,
    users  : [],
    error : ''
}


const fetchUserReducer = (state = initialState , action) =>
{

    switch (action.type) {
        case FETCH_USERS_REQUEST:

            return {
                ...state,
                loading : true      
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading : false,
                users : action.payload.data,
                error : ''
            }
        
        case FETCH_USERS_FAILURE:
            alert(action.payload)
            return{
                loading : false,
                users : [],
                error : action.payload
            }
    
        default:
            return state;
    }
}

export default fetchUserReducer