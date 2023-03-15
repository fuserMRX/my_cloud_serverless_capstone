import { getInitialData } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { handleCreateUser } from '../actions/users';

/**
 * Return initial load data for users, questions
 * @returns {Object} object with dispatch functions for store
 * @param dispatch
 */
export const handleInitialData = async (dispatch) => {
    dispatch(showLoading());
    const { users, questions, userInfo } = await getInitialData();
    await dispatch(receiveUsers(users));
    await dispatch(receiveQuestions(questions));
    await dispatch(handleCreateUser(userInfo));
    dispatch(hideLoading());
};