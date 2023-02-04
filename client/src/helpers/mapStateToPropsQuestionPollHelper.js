/**
* Combined Helper for QuestionPoll connected component
* @param {object} object - destructuring object which is made from store
* @param {object} props - props with router id which is taken from url
* @returns {object} returns object depending on view - results or question itself
*/
export const mapStateToPropsQuestionPollHelper = ({ users, questions, authedUser }, props) => {
    const { question_id } = props.match.params;
    const authedUserAnswersIds = Object.keys(Object.values(users).filter(user => user.id === authedUser)[0].answers) || [];

    // Get current question info
    const currentQuestion = Object.values(questions).filter( question => question.id === question_id)[0] || {};

    // Get info about questioner
    const questionUser = Object.values(users).filter(user => user.id === currentQuestion.author)[0] || {};

    // Default scenario - the question for the authedUser is unanswered
    const pollInformation = {
        isQuestionAnswered: false,
        questionUserName: questionUser.name,
        authedUser: authedUser,
        questionUserAvatar: questionUser.avatarURL,
        currentQuestion: currentQuestion,
    };

    // Check if authed user has the particular question answered
    if (authedUserAnswersIds.indexOf(question_id) !== -1) {
        pollInformation.isQuestionAnswered = true;
    }

    return pollInformation;
};