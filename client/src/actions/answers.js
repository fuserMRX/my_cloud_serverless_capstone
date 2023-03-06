
import { showLoading, hideLoading } from 'react-redux-loading';

// Local Import
import { saveQuestionAnswer } from '../utils/api';

export const SAVE_ANSWER = 'SAVE_ANSWER';

// This action is handled by two reducers - users and questions in order
// to separate logic for saving info about answer correspondingly
export const saveAnswer = ({authedUser, qid, answer}) => {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer
    };
};

export const handleSaveAnswer = (answerInfo) => {
    return (dispatch, getState) => {
        dispatch(showLoading());

        const { users, questions } = getState();

        return saveQuestionAnswer(answerInfo, users, questions)
            .then(() => dispatch(saveAnswer(answerInfo)))
            .then(() => dispatch(hideLoading()))
            .catch(e => {
                console.error('Error in handleSaveAnswer: ', e);
            });
    };
};