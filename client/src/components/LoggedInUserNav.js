import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LoggedInUserNav = (props) => {
    const helloText = 'Hello';
    return (
        <div className="userLogo">
            <p className="userName">{helloText}, {props.userInfo.name}</p>
            <p className="userEmail"> ({props.userInfo.email})</p>
            <img className="circle userLogoImage" src={props.userInfo.avatarURL} alt={props.userInfo.name} width='40'/>
        </div>
    );
};

LoggedInUserNav.propTypes = {
    userInfo: PropTypes.object.isRequired
};

const mapStateToProps = ({ users, authedUser }) => {
    return {
        userInfo: Object.values(users)
            .filter(({ id }) => id === authedUser)
            .map(({ name, avatarURL, email }) => ({ name, avatarURL, email }))[0] || {}
    };
};

export default connect(mapStateToProps)(LoggedInUserNav);
