import Auth from '../auth/Auth';
import Axios from 'axios';
import { apiEndpoint } from '../config';
import { createUserOrigin } from '../utils/userHelpers';

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

export function _getUsers() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...users }), 1000)
    })
}

export function _getQuestions() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...questions }), 1000)
    })
}

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

export const _saveQuestion = async (question, authedUser, users, questions) => {
    const auth = new Auth();
    const idToken = auth.getIdToken();

    let user = users[authedUser];
    if (!user) {
        user = createUserOrigin(authedUser);
    }

    const formattedQuestion = formatQuestion(question);

    user.questions = user.questions.concat([formattedQuestion.id]);

    let questionResponse = null;
    let userResponse = null;

    try {
        userResponse = await Axios.put(`${apiEndpoint}/users/${authedUser}`, JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
    } catch (e) {
        console.log(e);
    }

    try {
        questionResponse = await Axios.post(`${apiEndpoint}/questions`, JSON.stringify(formattedQuestion), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
    } catch (e) {
        console.log(e);
    }

    const responseQuestions = questionResponse && questionResponse.data.item;
    const responseUsers = userResponse && userResponse.data.item;


    //  TODO - delete this part after dealing with backend
    questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
    }

    users = {
        ...users,
        [authedUser]: {
            ...users[authedUser],
            questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
    }

    // res(formattedQuestion)
    // }, 1000)

    // return data;
    return formattedQuestion;
}

export const _saveQuestionAnswer = async (answerInfo, users, questions) => {
    const auth = new Auth();
    const idToken = auth.getIdToken();
    const { authedUser, qid, answer } = answerInfo;

    let usersResponse = null;
    let questionsResponse = null;

    let user = users[authedUser];
    if (!user) {
        user = createUserOrigin(authedUser);
    }

    user.answers[qid] = answer;
    const changedQuesiton = questions[qid];
    changedQuesiton[answer].votes.concat([authedUser]);

    try {
        usersResponse = await Axios.put(`${apiEndpoint}/users/${authedUser}`, JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
    } catch (e) {
        console.log(e);
    }

    try {
        questionsResponse = await Axios.patch(`${apiEndpoint}/questions/${qid}`, JSON.stringify(changedQuesiton), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
    } catch (e) {
        console.log(e);
    }

    //  TODO - should be uncommented when backend is implemented
    // users = userResponse;
    // questions = questionResponse;

    users = {
        ...users,
        [authedUser]: {
            ...users[authedUser],
            answers: {
                ...users[authedUser].answers,
                [qid]: answer
            }
        }
    }

    questions = {
        ...questions,
        [qid]: {
            ...questions[qid],
            [answer]: {
                ...questions[qid][answer],
                votes: questions[qid][answer].votes.concat([authedUser])
            }
        }
    }
}
