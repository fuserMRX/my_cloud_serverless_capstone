import Auth from '../auth/Auth';
import Axios from 'axios';
import { apiEndpoint } from '../config';

function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const _getUsers = async () => {
    const auth = new Auth();
    const idToken = auth.getIdToken();

    console.log('Fetching users');
    let users = [];

    try {
        const response = await Axios.get(`${apiEndpoint}/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
        });

        const { data } = response || {};
        const { users: responseUsers } = data || [];

        console.log('Users:', responseUsers);
        users = responseUsers;
    } catch (e) {
        console.log(e);
    }

    return users;
}

export const _getQuestions = async () => {
    const auth = new Auth();
    const idToken = auth.getIdToken();

    console.log('Fetching questions');
    let questions = [];

    try {
        const response = await Axios.get(`${apiEndpoint}/questions`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
        });

        const { data } = response || {};
        const { questions: responseQuesitons } = data || [];

        console.log('Questions:', responseQuesitons);
        questions = responseQuesitons;
    } catch (e) {
        console.log(e);
    }

    return questions;
}

export const _getAuthorizedUserInfo = async () => {
    const auth = new Auth();
    const idToken = auth.getIdToken();

    console.log('Fetching user Info');
    let userInfo = {};

    try {
        const response = await Axios.get(`${apiEndpoint}/userInfo`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
        });

        const { data } = response || {};
        const { userInfo: reponseUserInfo } = data || {};

        console.log('UsersInfo:', reponseUserInfo);
        userInfo = reponseUserInfo && reponseUserInfo.length && reponseUserInfo[0];
    } catch (e) {
        console.log(e);
    }

    return userInfo;
};

function formatQuestion({ optionOneText, optionTwoText, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        optionOne: {
            votes: [],
            text: optionOneText,
        },
        optionTwo: {
            votes: [],
            text: optionTwoText,
        }
    }
}

export const _saveQuestion = async (question, authedUser) => {
    const auth = new Auth();
    const idToken = auth.getIdToken();

    const formattedQuestion = formatQuestion(question);

    authedUser.questions = authedUser.questions.concat([formattedQuestion.id]);

    try {
        await Axios.put(`${apiEndpoint}/users`, JSON.stringify(authedUser), {
            headers: {
                // add 'text/plain' because 'applicaiton/json' does not work properly with nested json for lambda functions
                'Content-Type': 'text/plain',
                'Authorization': `Bearer ${idToken}`
            }
        });
    } catch (e) {
        console.log(`Issue with saving question for user ==>${e}`);
    }

    try {
        await Axios.post(`${apiEndpoint}/questions`, JSON.stringify(formattedQuestion), {
            headers: {
                // add 'text/plain' because 'applicaiton/json' does not work properly with nested json for lambda functions
                'Content-Type': 'text/plain',
                'Authorization': `Bearer ${idToken}`
            }
        });
    } catch (e) {
        console.log(`Issue with saving question istelf ==>${e}`);
    }

    return formattedQuestion;
}

export const _saveQuestionAnswer = async (answerInfo, questions) => {
    const auth = new Auth();
    const idToken = auth.getIdToken();
    const { authedUser, qid, answer } = answerInfo;

    authedUser.answers[qid] = answer;
    const changedQuesiton = Object.keys(questions).length && Object.values(questions).filter((question) => question.id === qid);

    if (changedQuesiton) {
        changedQuesiton[0][answer].votes = changedQuesiton[0][answer].votes.concat([authedUser.id]);

        try {
            await Axios.put(`${apiEndpoint}/users`, JSON.stringify(authedUser), {
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': `Bearer ${idToken}`
                }
            })
        } catch (e) {
            console.log(e);
        }

        try {
            await Axios.patch(`${apiEndpoint}/questions/${qid}`, JSON.stringify(changedQuesiton[0]), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    return { authedUser };
}

export const _removeQuestion = async (questionId, authedUser, questions) => {
    const auth = new Auth();
    const idToken = auth.getIdToken();
    let removedQuestionIndex = null;

    if (questionId in authedUser.answers) {
        delete authedUser.answers[questionId];
    }

    if (authedUser.questions.includes(questionId)) {
        const index = authedUser.questions.indexOf(questionId);
        authedUser.questions.splice(index, 1);
    }

    for (const property in questions) {
        const question = questions[property];
        if (question.id === questionId) {
            delete questions[property];
        }
    }

    if (removedQuestionIndex !== null) {
        delete questions[removedQuestionIndex];
    }

    try {
        await Axios.delete(`${apiEndpoint}/questions/${questionId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
    } catch (e) {
        console.log(e);
    }

    try {
        await Axios.patch(`${apiEndpoint}/users/${encodeURI(authedUser.id)}`, JSON.stringify(authedUser), {
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': `Bearer ${idToken}`
            }
        })
    } catch (e) {
        console.log(e);
    }

    return { updatedAuthedUser: authedUser };
}

export const _getUploadUrl = async (token, userEmail) => {
    let response = null;

    try {
        response = await Axios.post(`${apiEndpoint}/users/attachment/${userEmail}`, '', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (e) {
        console.log(e);
    }

    return response && response.data.uploadUrl;
};

export const _uploadFile = async (uploadUrl, file) => {
    await Axios.put(uploadUrl, file);
};
