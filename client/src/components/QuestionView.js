import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';

/**
* QuestionView
* @description Generic view for the Answered and Unanswered questions on the home page
* @param {object} props - props object
* @returns {object} DOM element
*/
const QuestionView = (props) => {
    const viewPoll = 'View Poll';
    const deleteQuestion = 'Delete Poll';
    const answered = 'Answered';
    const unanswered = 'Unanswered';

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
                <Image className="circle userLogoImage" src={props.questionOwnerData.avatarURL} rounded/>

                <Card.Body>
                    <Card.Header><b>{props.questionOwnerData.name} asks:</b></Card.Header>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        ...{props.question.optionOne.text || props.question.optionTwo.text || ''}...
                    </Card.Text>
                    <Button variant="outline-success" onClick={handleViewPoll} size="lg" block>{viewPoll}</Button>
                    {props.questionOwnerData.isAuthedUser ?
                        <Button variant="outline-danger" onClick={() => props.deleteQuesiton(props.question.id)} size="lg" block>{deleteQuestion}</Button> :
                        null}
                    {props.isAnswered ?
                        <Card.Footer className="text-muted"><Badge pill variant="success"> {answered} </Badge></Card.Footer> :
                        <Card.Footer className="text-muted"><Badge pill variant="light"> {unanswered} </Badge></Card.Footer>}
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
