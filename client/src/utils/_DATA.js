import Auth from '../auth/Auth';
import Axios from 'axios';
import { apiEndpoint } from '../config';

let users = {
    user1: {
        id: 'user1',
        name: 'First User',
        avatarURL: '/assets/images/sarah.png',
        email: 'sfgdfhdfhdfhdfh.com',
        answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionTwo',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },

    user2: {
        id: 'user2',
        name: 'Second User',
        avatarURL: '/assets/images/tyler.png',
        email: 'sfgdfhdfhdfhdfh.com',
        answers: {
            "vthrdm985a262al8qx3do": 'optionOne',
            "xj352vofupe1dqz9emx13r": 'optionTwo',
        },
        questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    },

    user3: {
        id: 'user3',
        name: 'Third User',
        avatarURL: '/assets/images/john.png',
        email: 'sfgdfhdfhdfhdfh.com',
        answers: {
            "xj352vofupe1dqz9emx13r": 'optionOne',
            "vthrdm985a262al8qx3do": 'optionTwo',
            "6ni6ok3ym7mf1p33lnez": 'optionTwo'
        },
        questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
};

let questions = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'user1',
        timestamp: 1467166872634,
        optionOne: {
            votes: ['user1'],
            text: 'have horrible short term memory',
        },
        optionTwo: {
            votes: [],
            text: 'have horrible long term memory'
        },
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        author: 'user2',
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: 'become a superhero',
        },
        optionTwo: {
            votes: ['user2', 'user1'],
            text: 'become a supervillain'
        }
    },
    "am8ehyc8byjqgar0jgpub9": {
        id: 'am8ehyc8byjqgar0jgpub9',
        author: 'user1',
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: 'be telekinetic',
        },
        optionTwo: {
            votes: ['user1'],
            text: 'be telepathic'
        }
    },
    "loxhs1bqm25b708cmbf3g": {
        id: 'loxhs1bqm25b708cmbf3g',
        author: 'user3',
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: 'be a front-end developer',
        },
        optionTwo: {
            votes: ['user1'],
            text: 'be a back-end developer'
        }
    },
    "vthrdm985a262al8qx3do": {
        id: 'vthrdm985a262al8qx3do',
        author: 'user3',
        timestamp: 1489579767190,
        optionOne: {
            votes: ['user3'],
            text: 'find $50 yourself',
        },
        optionTwo: {
            votes: ['user2'],
            text: 'have your best friend find $500'
        }
    },
    "xj352vofupe1dqz9emx13r": {
        id: 'xj352vofupe1dqz9emx13r',
        author: 'user2',
        timestamp: 1493579767190,
        optionOne: {
            votes: ['user2'],
            text: 'write JavaScript',
        },
        optionTwo: {
            votes: ['user3'],
            text: 'write Swift'
        }
    },
}

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

export const _getQuestions = async() => {
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

export const _createUser = (user) => {
    return new Promise((res, rej) => {

        setTimeout(() => {
            users = {
                ...users,
                [user.userId]: {
                    id: user.userId,
                    name: user.userName,
                    avatarURL: '/assets/images/no-name.png',
                    email: user.email,
                    answers: {},
                    questions: []
                }
            }

            res()
        }, 1000)
    })
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

    return  { authedUser };
}
