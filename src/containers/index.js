import react from 'react';
import App from '../components/App/';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

export default compose(
  firebaseConnect((props) => {
    return [
      'postList'
    ]
  }),
  connect((state) => ({
    postList: state.firebase.data.postList
  }))
)(App);
