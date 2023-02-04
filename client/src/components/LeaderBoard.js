import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

const LeaderBoard = (props) => {
    const answeredQuestions = 'Answered questions';
    const createdQuestions = 'Created questions';
    const score = 'Score';
    return (
        <div>
            <ul className='options leaderBoardAll'>
                {props.usersInfo.map((user, index) => (
                    <li key={user.id}>
                        <Card style={{height: '10rem'}}>
                            <Container fluid="xs">
                                <Row className="justify-content-md-center columnLeaderBoard">
                                    <div className="leaderBoardItemContainer triangle-topleft"></div>
                                    <div className={`leaderBoardItemContainer
                                    triangle-topleft-image-${(index === 0) ? 'gold' : (index === 1) ? 'silver' : 'bronze' }`}>
                                    </div>
                                    <Col className="leaderBoardItemContainer text-center" xs md="4">
                                        <Image className="circle leaderBoardImg" src={user.userPicture} alt={user.userName} />
                                    </Col>
                                    <Col className="leaderBoardItemContainer text-center leaderMiddle" md="auto">
                                        <p><b>{user.userName}</b></p>
                                        <p className="border-bottom">{answeredQuestions} - {user.answeredQuestions}</p>
                                        <p className="border-bottom">{createdQuestions} - {user.createdQuestions}</p>
                                    </Col>
                                    <Col className="leaderBoardItemContainer text-center" xs md="4">
                                        <Card style={{ width: '10rem', height: '8rem' }}>
                                            <Card.Header><b>{score}</b></Card.Header>
                                            <Card.Body>
                                                <h3>
                                                    <Badge pill variant="success">
                                                        {user.score}
                                                    </Badge>
                                                </h3>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = ({ users }) => {
    return {
        usersInfo: Object.values(users).map(({ id, name, avatarURL, answers, questions=[] }) => {
            const answeredQuestions = Object.keys(answers).length || 0;
            const createdQuestions = questions.length || 0;
            const score = answeredQuestions + createdQuestions;
            return {
                userName: name,
                userPicture: avatarURL,
                id,
                answeredQuestions,
                createdQuestions,
                score
            };
        }).sort((userA, userB) => userB.score - userA.score).slice(0, 3)
    };
};

LeaderBoard.propTypes = {
    usersInfo: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(LeaderBoard);
