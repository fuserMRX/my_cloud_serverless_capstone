import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class CreateUserForm extends Component {
    state = {
        toHome: false,
        validated: false,
        userName: ''
    }

    handleChange = (e) => {
        const userName = e.target.value;

        this.setState(() => ({
            userName
        }));
    };

    handleSubmit = (e) => {
        // Validation Check
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState(() => ({
                validated: true
            }));
            return;
        }

        e.preventDefault();

        // make user Id no more than 10 symols without spaces
        const userId = this.state.userName.replace(/\s/g, '').toLowerCase().slice(0, 11);
        const user = {
            userName: this.state.userName,
            userId: userId
        };

        sessionStorage.setItem('user', JSON.stringify(user));

        this.props.auth.login();
    }

    render() {
        const create = 'Create';
        const helpText = 'Corresponding user id will be created based on your name';
        const name = 'Name';
        const validationSuccess = 'Looks good!';
        const validationFailure = 'Please enter your name';
        return (
            <div>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label><b>{name}</b></Form.Label>
                        <Form.Control
                            required
                            name="userName"
                            placeholder='Enter your name'
                            value={this.state.userName}
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-muted">
                            {helpText}
                        </Form.Text>
                        <Form.Control.Feedback>{validationSuccess}</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            {validationFailure}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        {create}
                    </Button>
                </Form>
            </div>
        );
    }
}

export default connect()(CreateUserForm);
