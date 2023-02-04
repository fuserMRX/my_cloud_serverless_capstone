import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QuestionView from './QuestionView';
import { mapStateToProps } from '../helpers/mapStateToPropsHelper';
import { answeredView } from '../helpers/viewHelper';

const AnsweredQuestionsList = (props) => {
    return (
        <div>
            {props.answeredQuestions.map(answeredQuestion => (
                <QuestionView key={answeredQuestion.id}
                    question={answeredQuestion}
                    questionOwnerData={props.userNames[answeredQuestion.author]}
                    dispatch={props.dispatch}
                />
            ))}
        </div>
    );
};

AnsweredQuestionsList.propTypes = {
    answeredQuestions: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    userNames: PropTypes.object.isRequired
};

export default connect(mapStateToProps(answeredView))(AnsweredQuestionsList);

