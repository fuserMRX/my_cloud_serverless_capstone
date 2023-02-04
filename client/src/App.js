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

class App extends React.Component {
    state = {
        isAuthenticated: false,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleInitialData());

        window.addEventListener('isAuthenticatedUpdate', this.handleAuthenticationUpdate);
    }

    componentWillUnmount() {
        window.removeEventListener('isAuthenticatedUpdate', this.handleAuthenticationUpdate);
    }

    handleAuthenticationUpdate = (ev) => {
        this.setState(() => ({
            isAuthenticated: ev.detail.isAuthenticated,
        }));
        // TODO - add user creation logic!!!!
        // // Create user in DB action
        // dispatch(handleCreateUser(user))
        //     .catch(e => {
        //         console.log(e);
        //     });
    }

    render() {
        return (
            <>
                <LoadingBar style={{ backgroundColor: 'green', height: '5px' }} />
                <div className='container'>
                    {this.state.isAuthenticated ?
                        <>
                            {this.props.enableNavBar && <Navigation />}
                            <Switch>
                                <Route path='/' component={Home} />
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

const mapeStateToProps = ({ authedUser, navbar, isAuth0Authenticated }) => {
    return {
        enableLogin: authedUser !== null,
        enableNavBar: navbar,
        isAuth0Authenticated
    };
};

export default connect(mapeStateToProps)(App);
