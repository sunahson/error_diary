import react from 'react';
import App from '../components/App/';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import { changeValue, removeValue, resetValue } from '../actions';

const mapStateToProps = (state) => {
  return {
    postList: state.firebase.data.postList,
    postData: state.postData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeValue: (mode, value, id) => {
      dispatch(changeValue(mode, value, id));
    },
    onRemoveValue: (id) => {
      dispatch(removeValue(id));
    },
    onResetValue: () => {
      dispatch(resetValue());
    }
  };
};

export default compose(
  firebaseConnect((props) => {
    return [
      'postList'
    ]
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
