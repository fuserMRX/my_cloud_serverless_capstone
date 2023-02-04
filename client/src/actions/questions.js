import { showLoading, hideLoading } from 'react-redux-loading';

// Local Import
import { saveQuestion } from '../utils/api';

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

        question.author = authedUser;

        dispatch(showLoading());

        return saveQuestion(question)
            .then((questionRes) => dispatch(saveStoreQuestion(questionRes)))
            .then(() => dispatch(hideLoading()))
            .catch(e => {
                console.error('Error in handleSaveQuestion: ', e);
            });
    };
};