import { RECEIVE_USERS } from '../actions/users';
import { SAVE_ANSWER } from '../actions/answers';
import { SAVE_QUESTION } from '../actions/questions';
import { CREATE_USER } from '../actions/users';

const newUserDefaultAvatar = '/assets/images/no-name.png';


const users = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };
        case SAVE_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            };
        case SAVE_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([action.question.id])
                }
            };
        case CREATE_USER:
            return {
                ...state,
                [action.user.userId]: {
                    id: action.user.userId,
                    name: action.user.userName,
                    avatarURL: newUserDefaultAvatar,
                    answers: {},
                    questions: []
                }
            };
        default:
            return state;
    }
};

export default users;