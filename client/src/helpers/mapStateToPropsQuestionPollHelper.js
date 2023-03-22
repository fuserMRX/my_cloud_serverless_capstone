/**
* Combined Helper for QuestionPoll connected component
* @param {object} object - destructuring object which is made of store
* @param {object} props - props with router id which is taken from url
* @returns {object} returns object depending on view - results or question itself
*/
export const mapStateToPropsQuestionPollHelper = ({ users, questions, authedUser }, props) => {
    const { question_id } = props.match.params;
    const { answers } = authedUser || {};

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
    if (answers && (question_id in answers)) {
        pollInformation.isQuestionAnswered = true;
    }

    return pollInformation;
};