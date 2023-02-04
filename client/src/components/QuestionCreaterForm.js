import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Local Import
import { WouldYou } from '../helpers/viewHelper';
import { handleSaveQuestion } from '../actions/questions';
import { Submit } from '../helpers/viewHelper';


class QuestionCreaterForm extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
        validated: false
    }

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    handleChange = (e) => {
        const targetInput = e.target;
        const name = targetInput.name;
        const value = targetInput.value;
        this.setState(() => ({
            [name]: value
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

        const { dispatch } = this.props;
        const question = {
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo,
        };
        dispatch(handleSaveQuestion(question))
            .then(() => {
                this.setState(() => ({
                    toHome: true
                }));
            })
            .catch(e => {
                console.log(e);
            });
    };
    render() {
        const createNewQuestionText = 'Create New Question';
        const completeTheQuestionText = 'Complete the question:';
        const optionOneText = 'Enter Option One Text Here';
        const optionTwoText = 'Enter Option Two Text Here';
        const validationSuccess = 'Looks good!';
        const validationFailure1 = 'Please enter option one';
        const validationFailure2 = 'Please enter option two';

        if (this.state.toHome) {
            return <Redirect to='' />;
        }

        return (
            <div className="questionCreater">
                <Card style={{ width: '40rem' }}>
                    <Card.Header as="h2" className="text-center"><b>{createNewQuestionText}</b></Card.Header>
                    <Card.Body>
                        <p><b>{completeTheQuestionText}</b></p>
                        <b>{WouldYou}...</b>
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Form.Group >
                                <Form.Control
                                    required
                                    name="optionOne"
                                    placeholder={optionOneText}
                                    value={this.state.optionOne}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback>{validationSuccess}</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {validationFailure1}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <p className="text-center"><b>OR</b></p>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    name="optionTwo"
                                    placeholder={optionTwoText}
                                    value={this.state.optionTwo}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback>{validationSuccess}</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {validationFailure2}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                variant="success"
                                size="md"
                                type="submit"
                                block
                            >
                                {Submit}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default connect()(QuestionCreaterForm);
