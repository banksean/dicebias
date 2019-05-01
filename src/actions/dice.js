export const ADD_SAMPLE = 'ADD_SAMPLE';
export const UNDO_SAMPLE = 'UNDO_SAMPLE';

export const addSample = (val) => {
  return {
    type: ADD_SAMPLE,
    value: val
  };
};

export const undoSample = () => {
  return {
    type: UNDO_SAMPLE
  };
};