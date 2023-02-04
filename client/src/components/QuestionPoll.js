import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

// Local Import
import { WouldYou } from '../helpers/viewHelper';
import { Submit } from '../helpers/viewHelper';
import { handleSaveAnswer } from '../actions/answers';

class QuestionPoll extends Component {

    state = {
        value: null,
    }

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        questionInfo: PropTypes.object.isRequired
    }

    onRadioChange = (e) => {
        const value = e.target.value;
        this.setState(() => ({
            value
        }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        const qid = this.props.questionInfo.currentQuestion.id;
        const authedUser = this.props.questionInfo.authedUser;
        const answer = this.state.value;
        const { dispatch } = this.props;
        dispatch(handleSaveAnswer({ authedUser, qid, answer }));
    }

    render() {
        const questionerName = this.props.questionInfo.questionUserName;
        const avatar = this.props.questionInfo.questionUserAvatar;
        const question = this.props.questionInfo.currentQuestion;

        const asks = 'asks';

        if (!Object.keys(question).length) {
            return <Redirect to='/404' />;
        }

        return (
            <div className="quesitonPoll">
                <Card
                    style={{ width: '30rem' }}
                    bg="light"
                    border="light"
                >
                    <Card.Body>
                        <Card.Header><b>{questionerName} {asks}:</b></Card.Header>
                        <Card.Title className="text-center"><b>{WouldYou}...</b></Card.Title>
                        <Container fluid="xs" className="containerResult">
                            <Row>
                                <Col xs={4}>
                                    <img className="questionPollImg circle" src={avatar} alt={questionerName} />
                                </Col>
                                <Col xs={8} className="questionPollBorder">
                                    <form onSubmit={this.onSubmit}>
                                        <div onChange={this.onRadioChange}>
                                            <ul className='options'>
                                                <li>
                                                    <label>
                                                        <input type="radio" value="optionOne" name={this.props.questionInfo.authedUser} />
                                                        <span> {question.optionOne.text}</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="radio" value="optionTwo" name={this.props.questionInfo.authedUser} />
                                                        <span> {question.optionTwo.text}</span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <Button type="submit" variant="success" disabled={!this.state.value}>{Submit}</Button>
                                    </form>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default connect()(QuestionPoll);
