const getAuthorizedUser = () => {
    let user = null;
    let email = null;

    try {
        user = JSON.parse(localStorage.getItem('user'));
        email = localStorage.getItem('email');
        user.email = email;
        user.avatarURL = '/assets/images/no-name.png';
        user.answers = {};
        user.questions = [];
    } catch (e) {
        console.log(e);
    }

    return {
        user,
    }
};

const createUserOrigin = (user) => {
    const { userId, userName, email } = user;
    return {
        id: userId,
        name: userName,
        avatarURL: '/assets/images/no-name.png',
        email,
        answers: {},
        questions: []
    };
};

module.exports = {
    getAuthorizedUser,
    createUserOrigin,
}