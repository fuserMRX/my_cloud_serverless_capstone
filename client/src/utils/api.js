import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
    _createUser,
    _getAuthorizedUser,
} from './_DATA.js';

export const getInitialData = () => {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }));
}

export const saveQuestion = (question, authedUser, users, questions) => {
    return _saveQuestion(question, authedUser, users, questions);
}

export const saveQuestionAnswer = (answerInfo, users, questions) => {
    return _saveQuestionAnswer(answerInfo, users, questions);
}

export const createUserDB = (user) => {
    return _createUser(user);
}

export const getAuthorizedUser = () => {
    return _getAuthorizedUser();
}