export const SET_AUTH0 = 'SET_AUTH0';

export const setAuth0AuthenticationResult = (flag) => {
    return {
        type: SET_AUTH0,
        flag
    };
};