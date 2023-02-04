import { SET_AUTH0 } from '../actions/auth0Authentication';

const isAuth0Authenticated = (state = false, action) => {
    switch (action.type) {
        case SET_AUTH0:
            return action.flag;
        default:
            return state;
    }
};

export default isAuth0Authenticated;