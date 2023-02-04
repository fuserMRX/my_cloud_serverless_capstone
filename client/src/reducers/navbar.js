import { HIDE_NAV } from '../actions/navbar';


const navbar = (state = true, action) => {
    switch (action.type) {
        case HIDE_NAV:
            return action.flag;
        default:
            return state;
    }
};

export default navbar;