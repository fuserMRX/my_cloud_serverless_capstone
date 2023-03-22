import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

const LoggedInUserNav = (props) => {
    const helloText = 'Hello';
    const history = useHistory();

    const onEditButtonClick = (userEmail) => {
        history.push(`/users/${userEmail}/edit`);
    };

    return (
        <>
            <div className="userLogo">
                <p className="userName">{helloText}, {props.userInfo.name}</p>
                <p className="userEmail"> ({props.userInfo.email})</p>
                <div className="changeAvatar">
                    <Image className="circle userLogoImage" src={props.userInfo.avatarURL + '?n=' + Math.random() } rounded />
                    <Button
                        variant="success"
                        size="sm"
                        onClick={() => onEditButtonClick(props.userInfo.email)}
                    >
                        <i className="fa-sharp fa-solid fa-pen-nib"></i>
                    </Button>
                </div>
            </div>
        </>

    );
};

LoggedInUserNav.propTypes = {
    userInfo: PropTypes.object.isRequired
};

const mapStateToProps = ({ authedUser }) => {
    return {
        userInfo: authedUser
    };
};

export default connect(mapStateToProps)(LoggedInUserNav);
