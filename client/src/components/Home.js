import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner';

// Local Import
import UnansweredQuestionsList from './UnansweredQuestionsList';
import AnsweredQuestionsList from './AnsweredQuestionsList';
import { handleCreateUser } from '../actions/users';
import { handleInitialData } from '../actions/shared';

const Home = () => {
    // Switch active tab by using state
    const [key, setKey] = useState('unquesitons');
    const [spinnerKey, setSpinnerKey] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleCreateUser());
        dispatch(handleInitialData());
        setSpinnerKey(false);
    }, []);

    return (
        <>
            {
                spinnerKey ?
                    <div className="text-center">
                        <Spinner animation="grow" size="sm" />
                        <Spinner animation="grow" size="sm" />
                        <Spinner animation="grow" size="sm" />
                    </div>
                    :
                    <div className="text-center questions">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                        >
                            <Tab
                                eventKey="unquesitons"
                                title="Unanswered Questions"
                            >
                                <UnansweredQuestionsList />
                            </Tab>
                            <Tab
                                eventKey="questions"
                                title="Answered Questions"
                            >
                                <AnsweredQuestionsList />
                            </Tab>
                        </Tabs>
                    </div>
            }
        </>
    );
};

export default Home;
