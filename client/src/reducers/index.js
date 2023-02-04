import { combineReducers } from 'redux';
import authedUser from './authedUser';
import questions from './questions';
import users from './users';
import navbar from './navbar';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
    authedUser,
    users,
    questions,
    navbar,
    loadingBar: loadingBarReducer,
});
