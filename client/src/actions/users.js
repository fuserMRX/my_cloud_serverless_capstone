import { showLoading, hideLoading } from 'react-redux-loading';

// Local Import
import { setAuthedUser } from '../actions/authedUser';
import { getAuthorizedUser } from '../utils/userHelpers';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const CREATE_USER = 'CREATE_USER';
export const GET_USER_INFO = 'GET_USER_INFO';

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

export const getUserInfo = (user) => {
    return {
        type: GET_USER_INFO,
        user
    };
};

export const handleCreateUser = (userInfo) => {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const { user } = getAuthorizedUser();
            const { name } = user || {};

            const authedUser = userInfo || user;

            if (name) {
                authedUser.name = name;
            }

            dispatch(setAuthedUser(authedUser));
            dispatch(hideLoading());
        } catch (e) {
            console.error('Error in getAuthorizedUser: ', e);
        } finally {
            dispatch(hideLoading());
        }
    };
};