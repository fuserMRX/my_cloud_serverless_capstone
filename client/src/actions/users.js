import { showLoading, hideLoading } from 'react-redux-loading';

// Local Import
import { setAuthedUser } from '../actions/authedUser';
import { createUserDB } from '../utils/api';


export const RECEIVE_USERS = 'RECEIVE_USERS';
export const CREATE_USER = 'CREATE_USER';

export const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users
    };
};

export const createUser = (user) => {
    return {
        type: CREATE_USER,
        user
    };
};

export const handleCreateUser = (user) => {
    return (dispatch) => {
        dispatch(showLoading());

        return createUserDB(user)
            .then(() => dispatch(createUser(user)))
            .then(() => dispatch(setAuthedUser(user.userId)))
            .then(() => dispatch(hideLoading()))
            .catch(e => {
                console.error('Error in createUserDB: ', e);
            });
    };
};
