import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
    _getAuthorizedUserInfo,
    _removeQuestion,
    _getUploadUrl,
    _uploadFile,
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

export const removeQuestion = async (qid, authedUser, questions) => {
    return await _removeQuestion(qid, authedUser, questions);
}

export const saveQuestionAnswer = (answerInfo, questions) => {
    return _saveQuestionAnswer(answerInfo, questions);
}

export const getUploadUrl = async (token, userEmail) => {
    return await _getUploadUrl(token, userEmail);
};

export const uploadFile = async (uploadUrl, file) => {
    return await _uploadFile(uploadUrl, file);
};