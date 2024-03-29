import { showLoading, hideLoading } from 'react-redux-loading';

// Local Import
import { saveQuestion, removeQuestion } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
};

export const saveStoreQuestion = (question) => {
    return {
        type: SAVE_QUESTION,
        question
    };
};

export const handleSaveQuestion = (question) => {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestion(question, authedUser)
            .then(() => dispatch(hideLoading()))
            .catch(e => {
                console.error('Error in handleSaveQuestion: ', e);
            });
    };
};

export const handleQuestionRemoval = (qid) => {
    return async (dispatch, getState) => {
        const { authedUser, questions } = getState();

        dispatch(showLoading());

        await removeQuestion(qid, authedUser, questions);
        dispatch(hideLoading());
    };
};