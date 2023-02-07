import React from 'react';
import { NavLink } from 'react-router-dom';

// Local Import
import LoggedInUserNav from './LoggedInUserNav';
import Logout from './Logout';

const Navigation = (props) => {
    const home = 'Home';
    const newQuestion = 'New Question';
    const leaderboard = 'LeaderBoard';
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='activeTab'>
                        {home}
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' activeClassName='activeTab'>
                        {newQuestion}
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='activeTab'>
                        {leaderboard}
                    </NavLink>
                </li>
                <li>
                    <LoggedInUserNav />
                </li>
                <li>
                    <Logout auth={props.auth}/>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;