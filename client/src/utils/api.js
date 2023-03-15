import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
    _createUser,
    _getAuthorizedUserInfo,
} from './_DATA.js';

export const getInitialData = () => {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
        _getAuthorizedUserInfo(),
    ]).then(([users, questions, userInfo]) => ({
        users,
        questions,
        userInfo,
    }));
}

export const saveQuestion = (question, authedUser) => {
    return _saveQuestion(question, authedUser);
}

export const saveQuestionAnswer = (answerInfo, questions) => {
    return _saveQuestionAnswer(answerInfo, questions);
}

export const createUserDB = (user) => {
    return _createUser(user);
}