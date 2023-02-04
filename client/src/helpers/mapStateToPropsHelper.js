import { unansweredView, answeredView } from '../helpers/viewHelper';

/**
* Combined Helper for mapStateToProps in UnansweredQuestionsList and AnsweredQuestionsList connected components
* @param {viewParam} viewParam - view param so that it can be possible to detect answered or unanswered views
* @returns {object} returns object with answers and user names
*/
export const mapStateToProps = (viewParam) => {
    return function ({ users, questions, authedUser }) {
        let userNames = {};
        // Filter only loggedIn user data and get question owner data like name, avatarURL
        const loggedInUserData = Object.values(users).filter((user) => {
            userNames = {
                ...userNames,
                [user.id]: {
                    ...userNames[user.id],
                    name: user.name,
                    avatarURL: user.avatarURL
                },
            };
            return user.id === authedUser;
        });

        // LoggedIn user answers
        const answers = (loggedInUserData.length && Object.keys(loggedInUserData[0].answers)) || [];

        // Answered and unanswered quesitons for the loggedIn user
        let sortedQuestions = [];

        if (viewParam === unansweredView) {
            sortedQuestions = Object.values(questions).filter((question) => {
                return answers.indexOf(question.id) === -1;
            }).sort((a, b) => b.timestamp - a.timestamp);
        }
        if (viewParam === answeredView) {
            sortedQuestions = Object.values(questions).filter((question) => {
                return answers.indexOf(question.id) !== -1;
            }).sort((a, b) => b.timestamp - a.timestamp);
        }

        return {
            [viewParam]: sortedQuestions,
            'userNames': userNames
        };
    };
};