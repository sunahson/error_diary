import react from 'react';
import App from '../components/App/';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';

export default compose(
  firebaseConnect((props) => {
    return [
      'postList'
    ]
  }),
  withRouter,
  connect((state) => ({
    postList: state.firebase.data.postList
  }))
)(App);
