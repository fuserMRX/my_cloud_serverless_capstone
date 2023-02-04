import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

// Local Import
import UnansweredQuestionsList from './UnansweredQuestionsList';
import AnsweredQuestionsList from './AnsweredQuestionsList';

const Home = () => {
    // Switch active tab by using state
    const [key, setKey] = useState('unquesitons');

    return (
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
    );
};

export default Home;
