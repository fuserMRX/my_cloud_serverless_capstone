import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { showLoading, hideLoading } from 'react-redux-loading';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

// Local imports
import { setAuthedUser } from '../actions/authedUser';
import CustomSelectOption from './CustomSelectOption';
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

        dispatch(showLoading());
        dispatch(setAuthedUser(this.state.value));
        setTimeout(function () {
            dispatch(hideLoading());
        }, 300);
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
        const PLACEHOLDER = 'Select User';
        const LOGIN = 'Sign in';
        const WELCOME = 'Welcome to Would You Rather App!';
        const SIGNIN = 'Please sign in to continue';
        const CREATE = 'Sign up';
        return (
            <>
                <Jumbotron fluid>
                    <div className="text-center container">
                        <h3><b>{WELCOME}</b></h3>
                        <h5>{SIGNIN}</h5>
                        <Image src="/assets/images/AI-jail.png" fluid />
                        <form onSubmit={this.handleSubmit}>
                            <Select
                                closeMenuOnSelect={true}
                                placeholder={PLACEHOLDER}
                                onChange={this.handleChange}
                                options={this.props.loginUsers}
                                formatOptionLabel={CustomSelectOption} // Customize select option with image
                            />
                            <div className="loginButtons">
                                <Button className='btn' type='submit' variant="success" disabled={!this.state.value}>
                                    {LOGIN}
                                </Button>
                                <p className="loginButtonSection"><b>OR</b></p>
                                <Button className='btn' variant="success" onClick={this.handleModal} value={true}>
                                    {CREATE}
                                </Button>
                            </div>
                        </form>
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
