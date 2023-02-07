import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { Route, Switch } from 'react-router-dom';

// Local imports
import Login from './components/Login';
import Home from './components/Home';
import QuestionPollWrapper from './components/QuestionPollWrapper';
import QuestionCreaterForm from './components/QuestionCreaterForm';
import LeaderBoard from './components/LeaderBoard';
import Navigation from './components/Nav';
import GenericNotFound from './components/GenericNotFound';
import Callback from './components/Callback';
import { handleInitialData } from './actions/shared';
import { handleCreateUser } from './actions/users';

class App extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleInitialData());

        window.addEventListener('isAuthenticatedUpdate', this.handleAuthenticationUpdate);
    }

    componentWillUnmount() {
        window.removeEventListener('isAuthenticatedUpdate', this.handleAuthenticationUpdate);
    }

    handleAuthenticationUpdate = async (ev) => {
        const { dispatch } = this.props;

        let user = null;

        try {
            user = JSON.parse(sessionStorage.getItem('user'));
        } catch (e) {
            console.log(e);
        }

        if (ev.detail.isAuthenticated && user) {
            await dispatch(handleCreateUser(user));
        }
    }

    render() {
        return (
            <>
                <LoadingBar style={{ backgroundColor: 'green', height: '5px' }} />
                <div className='container'>
                    {(this.props.enableLogin && this.props.auth.isAuthenticated()) ?
                        <>
                            {this.props.enableNavBar && <Navigation auth={this.props.auth}/>}
                            <Switch>
                                <Route path='/' exact component={Home} />
                                <Route path='/questions/:question_id' exact component={QuestionPollWrapper} />
                                <Route path='/add' exact component={QuestionCreaterForm} />
                                <Route path='/leaderboard' exact component={LeaderBoard} />
                                <Route path='/404' component={GenericNotFound} />
                                <Route component={GenericNotFound} />
                            </Switch>
                        </> : <>
                            <Login auth={this.props.auth} />
                            <Route
                                path='/callback'
                                render={(props) => {
                                    console.log('history pops ===========>', props);
                                    console.log('inner props ============>', this.props);
                                    this.props.handleAuthentication(props);
                                    return <Callback />;
                                }}
                            />
                        </>
                    }
                </div>
            </>
        );
    }
}

const mapeStateToProps = ({ authedUser, navbar }) => {
    return {
        enableLogin: authedUser !== null,
        enableNavBar: navbar,
    };
};

export default connect(mapeStateToProps)(App);
