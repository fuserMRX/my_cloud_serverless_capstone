import { showLoading, hideLoading } from 'react-redux-loading';

// Local Import
import { setAuthedUser } from '../actions/authedUser';
import { getAuthorizedUser } from '../utils/api';

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

export const handleCreateUser = () => {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const { user } = getAuthorizedUser();
            if (user) {
                // TODO - should be removed when backend is alive
                dispatch(createUser(user));

                dispatch(setAuthedUser(user.userId));
                dispatch(hideLoading());
            }
        } catch (e) {
            console.error('Error in getAuthorizedUser: ', e);
        } finally {
            dispatch(hideLoading());
        }
    };
};