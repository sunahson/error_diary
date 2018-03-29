import * as types from '../constants/ActionTypes';

export const changeValue = (mode, value, id) => {
  return {
    type: types.CHANGE_VALUE,
    payload: mode,
    id,
    value
  }
};

export const removeValue = (id) => {
  return {
    type: types.REMOVE_VALUE,
    id
  }
};

export const resetValue = () => {
  return {
    type: types.RESET_VALUE
  }
};
