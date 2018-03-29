import * as types from '../constants/ActionTypes';

export const changeValue = (mode, value, id) => {
  return {
    type: types.CHANGE_VALUE,
    payload: mode,
    value,
    id
  };
};

export const removeValue = (id) => {
  return {
    type: types.REMOVE_VALUE,
    id
  };
};

export const resetValue = () => {
  return {
    type: types.RESET_VALUE
  };
};

export const showErrorSign = (mode) => {
  return {
    type: types.SHOW_ERROR,
    payload: mode
  };
};

export const removeErrorSign = () => {
  return {
    type: types.REMOVE_ERROR
  };
};
