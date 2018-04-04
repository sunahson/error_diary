import { combineReducers } from 'redux';
import { CHANGE_VALUE, REMOVE_VALUE, RESET_VALUE, SHOW_ERROR, REMOVE_ERROR } from '../constants/ActionTypes';

const initialState = {
  postData: {
    title: '',
    content: [],
    beforeData: [],
    solution: '',
    afterData: []
  },
  errorData: {
    error: false,
    message: ''
  }
};

const postData = (state = initialState.postData, action) => {
  switch (action.type) {
    case CHANGE_VALUE:
      if (action.payload === 'title') {
        return Object.assign({}, state, {
          title: action.value
        });
      } else if (action.payload.includes('content')) {
        let newContent = state.content.slice();

        action.payload === 'contentTitle'? newContent[0] = action.value : newContent[1] = action.value;

        return Object.assign({}, state, {
          content: newContent
        });
      } else if (action.payload.includes('beforeData')) {
        let newBeforeData = state.beforeData.slice();

        if (newBeforeData[action.id] === undefined) {
          newBeforeData[action.id] = new Array();
        }

        action.payload === 'beforeDataFileName'? newBeforeData[action.id][0] = action.value : newBeforeData[action.id][1] = action.value;

        return Object.assign({}, state, {
          beforeData: newBeforeData
        });
      } else if (action.payload === 'solution') {
        return Object.assign({}, state, {
          solution: action.value
        });
      } else if (action.payload.includes('afterData')) {
        let newAfterData = state.afterData.slice();

        if (newAfterData[action.id] === undefined) {
          newAfterData[action.id] = new Array();
        }

        action.payload === 'afterDataFileName'? newAfterData[action.id][0] = action.value : newAfterData[action.id][1] = action.value;

        return Object.assign({}, state, {
          afterData: newAfterData
        });
      }
    case REMOVE_VALUE:
      let newBeforeData = state.beforeData.slice();
      let newAfterData = state.afterData.slice();

      newBeforeData[action.id] = ['', ''];
      newAfterData[action.id] = ['', ''];

      return Object.assign({}, state, {
        beforeData: newBeforeData,
        afterData: newAfterData
      });
    case RESET_VALUE:
      return Object.assign({}, state, {
        title: '',
        content: [],
        beforeData: [],
        afterData: [],
        solution: ''        
      });
    default:
      return Object.assign({}, state);
  }
};

const errorData = (state = initialState.errorData, action) => {
  switch (action.type) {
    case SHOW_ERROR:
    if (action.payload === 'title') {
      return Object.assign({}, state, {
        error: 'title',
        message: ''
      });
    } else if (action.payload === 'contentTitle') {
      return Object.assign({}, state, {
        error: 'contentTitle',
        message: ''
      });
    } else if (action.payload === 'contentContent') {
      return Object.assign({}, state, {
        error: 'contentContent',
        message: ''
      });
    } else if (action.payload === 'beforeDataZero') {
      return Object.assign({}, state, {
        error: 'beforeDataZero',
        message: '추가 버튼을 눌러 파일 이름과 코드를 작성하세요.'
      });
    } else if (action.payload === 'beforeAfterData') {
      return Object.assign({}, state, {
        error: 'beforeAfterData',
        message: '파일 이름과 코드를 모두 작성했는지 확인해주세요.'
      });
    } else if (action.payload === 'solution') {
      return Object.assign({}, state, {
        error: 'solution',
        message: ''
      });
    }
    case REMOVE_ERROR:
      return Object.assign({}, state, {
        error: '',
        message: ''
      });
    default:
      return Object.assign({}, state);
  }
};

export default {
  postData,
  errorData
};
