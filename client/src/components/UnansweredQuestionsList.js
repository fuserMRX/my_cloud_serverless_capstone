import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Local imports
import QuestionView from './QuestionView';
import { mapStateToProps } from '../helpers/mapStateToPropsHelper';
import { unansweredView } from '../helpers/viewHelper';

const UnansweredQuestionsList = (props) => {
    return (
        <div>
            {props.unansweredQuestions.map(unansweredQuestion => (
                <QuestionView key={unansweredQuestion.id}
                    question={unansweredQuestion}
                    questionOwnerData={props.userNames[unansweredQuestion.author]}
                    dispatch={props.dispatch}
                />
            ))}
        </div>
    );
};

UnansweredQuestionsList.propTypes = {
    unansweredQuestions: PropTypes.array.isRequired,
    userNames: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps(unansweredView))(UnansweredQuestionsList);
