
import { showLoading, hideLoading } from 'react-redux-loading';
import { setAuthedUser } from '../actions/authedUser';

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
    return async (dispatch, getState) => {
        dispatch(showLoading());

        const { questions, authedUser } = getState();
        answerInfo.authedUser = authedUser;

        const { authedUser: updatedAuthUser } = await saveQuestionAnswer(answerInfo, questions);
        await dispatch(setAuthedUser(updatedAuthUser));
        dispatch(hideLoading());
    };
};