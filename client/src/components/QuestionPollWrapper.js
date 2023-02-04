import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Local imports
import { mapStateToPropsQuestionPollHelper as mapStateToProps } from '../helpers/mapStateToPropsQuestionPollHelper';
import QuestionPoll from './QuestionPoll';
import ResultsPoll from './ResultsPoll';

const QuestionPollWrapper = (props) => {
    return (
        <>
            {props.isQuestionAnswered ?
                <ResultsPoll resultsInfo={props}/> :
                <QuestionPoll questionInfo={props}/>
            }
        </>
    );
};

QuestionPollWrapper.propTypes = {
    isQuestionAnswered: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(QuestionPollWrapper);
