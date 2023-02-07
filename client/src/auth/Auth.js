import auth0 from 'auth0-js';
import { authConfig } from '../config';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: authConfig.domain,
        clientID: authConfig.clientId,
        redirectUri: authConfig.callbackUrl,
        responseType: 'token id_token',
        scope: 'openid'
    });

    constructor(history) {
        this.history = history;
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getIdToken = this.getIdToken.bind(this);
        this.renewSession = this.renewSession.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication = () => {
        const authenticationEvent = new CustomEvent('isAuthenticatedUpdate', {
            detail: {
                isAuthenticated: true,
            }
        });

        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log('Access token: ', authResult.accessToken);
                console.log('id token: ', authResult.idToken);
                this.setSession(authResult);
                window.dispatchEvent(authenticationEvent);
            } else if (err) {
                this.history.replace('/');
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    getAccessToken() {
        let accessToken = null;
        try {
            accessToken = JSON.parse(localStorage.getItem('access_token'));
            return accessToken;
        } catch (e) {
            console.log(`Error in parsing of accessToken: ${e}`);
        }

        return accessToken;
    }

    getIdToken() {
        let idToken = null;
        try {
            idToken = JSON.parse(localStorage.getItem('id_token'));
            return idToken;
        } catch (e) {
            console.log(`Error in parsing of idToken: ${e}`);
        }

        return idToken;
    }

    setSession(authResult) {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);


        // The history state should be cleared with an empty object otherwise
        // we will get the previous 'callback' location there
        // for the Routes inside App.js !!!!!!
        this.history.replace({ pathname: '/', state: {} });
    }



    renewSession() {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                console.log(err);
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
        });
    }

    logout() {
        // Remove tokens and expiry time
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');

        sessionStorage.removeItem('user');

        // Allowed logout URL should be configured on https://manage.auth0.com/!!!! for a correct redirect
        this.auth0.logout();

        // navigate to the home route
        this.history.replace({ pathname: '/', state: {} });
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}
