import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showLoading } from 'react-redux-loading';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { v4 as uuidv4 } from 'uuid';

// Local imports
import CreateUserModal from './CreateUserModal';

class Login extends Component {
    state = {
        value: null,
        modalShow: false
    };

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        loginUsers: PropTypes.array.isRequired
    };

    handleChange = (e) => {
        let selectedValue = e.value;
        this.setState(() => ({
            value: selectedValue
        }
        ));
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;

        const user = {
            userName: this.state.value,
            userId: uuidv4(),
            isCreated: true,
        };

        dispatch(showLoading());

        localStorage.setItem('user', JSON.stringify(user));
        this.props.auth.login();
    }

    /**
    * handleModal
    * @description Show or hide modal for user creation
    * @param {object} event - SyntheticEvent object
    * @param {boolean} modalAvailabilityFlag - modalAvailabilityFlag boolean value - hide modal flag
    * @returns {void}
    */
    handleModal = (event, modalAvailabilityFlag) => {
        // event value is taken in order not to handle click with inline function: () =>
        // in other words - performance saver
        const eventValue = event && event.target.value;
        const flag = eventValue ? !!eventValue : modalAvailabilityFlag;
        this.setState(() => ({
            modalShow: flag
        }));
    }

    render() {
        const WELCOME = 'Welcome to Would You Rather App!';
        const LOGIN = 'Please log in to continue';
        const CREATE = 'Log in';
        return (
            <>
                <Jumbotron fluid>
                    <div className="text-center container">
                        <div className=''>
                            <h3><b>{WELCOME}</b></h3>
                            <h5>{LOGIN}</h5>
                            <Image src="/assets/images/AI-jail.png" fluid />
                        </div>
                        <div className=''>
                            <form onSubmit={this.handleSubmit}>
                                <div className="loginButtons">
                                    <Button className='btn' variant="success" onClick={this.handleModal} value={true}>
                                        {CREATE}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Jumbotron>
                <CreateUserModal auth={this.props.auth} show={this.state.modalShow} onHide={this.handleModal}/>
            </>
        );
    }
}

const mapStateToProps = ({ users }) => {
    return {
        loginUsers: Object.values(users).map(({ id, name, avatarURL }) => ({ value: id, label: name, customAbbreviation: avatarURL })),
    };
};

export default connect(mapStateToProps)(Login);
