import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

// Local Import
import { removeAuthedUser } from '../actions/authedUser';

const Logout = (props) => {

    const logout = 'Logout';
    const history = useHistory();

    const clickHandler = () => {
        const { dispatch } = props;

        history.push('/');
        dispatch(removeAuthedUser());
    };

    return (
        <div>
            <Button onClick={clickHandler} className="logoutLink" variant="outline-light">{logout}</Button>
        </div>
    );
};

Logout.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(Logout);