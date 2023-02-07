import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Local Imports
import { hideNavbar } from '../actions/navbar';

class GenericNotFound extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(hideNavbar(false));
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <h2><b>404</b> - Page not found: <code>path - {this.props.location.pathname}</code></h2>
                    <h3>please try to use the right url</h3>
                </div>
            </div>
        );
    }
}

export default connect()(GenericNotFound);
