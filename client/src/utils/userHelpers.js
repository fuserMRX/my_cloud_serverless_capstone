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

module.exports = {
    getAuthorizedUser,
}