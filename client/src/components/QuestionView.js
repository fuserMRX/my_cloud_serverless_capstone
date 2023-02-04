import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

/**
* QuestionView
* @description Generic view for the Answered and Unanswered questions on the home page
* @param {object} props - props object
* @returns {object} DOM element
*/
const QuestionView = (props) => {
    const viewPoll = 'viewPoll';

    // Use react hook useHistory to move to another route
    const history = useHistory();

    const handleViewPoll = () => {
        history.push(`questions/${props.question.id}`);
    };

    return (
        <>
            <Card
                style={{ width: '30rem' }}
                bg="light"
                border="light"
            >
                <Card.Img className="circle" src={props.questionOwnerData.avatarURL} alt={props.questionOwnerData.name}/>
                <Card.Body>
                    <Card.Header><b>{props.questionOwnerData.name} asks:</b></Card.Header>
                    <Card.Title></Card.Title>
                    <Card.Text>
                    ...{props.question.optionOne.text || props.question.optionTwo.text || ''}...
                    </Card.Text>
                    <Button variant="outline-success" onClick={handleViewPoll}>{viewPoll}</Button>
                </Card.Body>
            </Card>
        </>
    );
};

QuestionView.propTypes = {
    question: PropTypes.object.isRequired,
    questionOwnerData: PropTypes.object.isRequired
};

export default QuestionView;
