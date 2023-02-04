import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

// Local Import
import { WouldYou } from '../helpers/viewHelper';

/**
* Get answer rate for th curernt question
* @param {object} optionVotes - option (one or two) votes
* @param {number} allVotes - number of all votes
* @param {string} userId - userId
* @returns {object} returns object with percentage and text for option
*/
function getVotesPercentageInfo(optionVotes, allVotes, userId) {
    const authedUserVote = optionVotes.filter(vote => vote === userId).length;
    const currentVotes = optionVotes.length;

    return {
        precentRate: currentVotes ? ((currentVotes * 100) / allVotes).toFixed(1) : 0,
        percentText: `${currentVotes} out of ${allVotes} votes`,
        isVotedByAuthedUser: !!authedUserVote
    };
}


const ResultsPoll = (props) => {
    const question = props.resultsInfo.currentQuestion;
    const authedUser = props.resultsInfo.authedUser;
    const optionOneVotes = question.optionOne.votes;
    const optionTwoVotes = question.optionTwo.votes;
    const allVotes = optionOneVotes.length + optionTwoVotes.length;

    const optionOneInfo = getVotesPercentageInfo(optionOneVotes, allVotes, authedUser);
    const optionTwoInfo = getVotesPercentageInfo(optionTwoVotes, allVotes, authedUser);

    const AskedByText = 'Asked by';
    const RESULTS = 'Results:';

    return (
        <div className="resultsPoll">
            <Card
                style={{ width: '30rem' }}
                bg="light"
                border="light"
            >
                <Card.Body>
                    <Card.Header><b>{AskedByText} {props.resultsInfo.questionUserName}</b></Card.Header>
                    <Card.Title></Card.Title>
                    <Container fluid="xs">
                        <Row>
                            <Col md={4} className="resultImageBlock">
                                <img
                                    className="questionResultImg circle"
                                    src={props.resultsInfo.questionUserAvatar}
                                    alt={props.resultsInfo.questionUserName}
                                />
                            </Col>
                            <Col md={8} className="resultPollBorder">
                                <h4><b>{RESULTS}</b></h4>

                                <Card border={`${optionOneInfo.isVotedByAuthedUser ? 'success' : 'resultPollBorderWithoutVote'}`}
                                    style={{ width: '17.5rem' }}
                                >
                                    <Card.Header>{WouldYou} {question.optionOne.text}?</Card.Header>
                                    {optionOneInfo.isVotedByAuthedUser && <img src="/assets/images/approved.png" className="votedBadge" width='50' alt='aprroved result'/>}
                                    <Card.Body>
                                        <ProgressBar variant="success" now={optionOneInfo.precentRate} label={`${optionOneInfo.precentRate}%`} />
                                        <p>{optionOneInfo.percentText}</p>
                                    </Card.Body>
                                </Card>
                                <Card.Text></Card.Text>
                                <Card border={`${optionTwoInfo.isVotedByAuthedUser ? 'success' : 'resultPollBorderWithoutVote'}`}
                                    style={{ width: '17.5rem' }}
                                >
                                    <Card.Header>{WouldYou} {question.optionTwo.text}?</Card.Header>
                                    {optionTwoInfo.isVotedByAuthedUser && <img src="/assets/images/approved.png" className="votedBadge" width='50' alt='aprroved result'/>}
                                    <Card.Body>
                                        <ProgressBar variant="success" now={optionTwoInfo.precentRate} label={`${optionTwoInfo.precentRate}%`} />
                                        <p>{optionTwoInfo.percentText}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
};

ResultsPoll.propTypes = {
    resultsInfo: PropTypes.object.isRequired
};

export default ResultsPoll;
