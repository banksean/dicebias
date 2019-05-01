import { ADD_SAMPLE, UNDO_SAMPLE } from '../actions/dice';

const INITIAL_STATE = {
  samples: []
};

const dice = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SAMPLE:
      return {
        samples: [...state.samples, action.value]
      };
    case UNDO_SAMPLE:
      state.samples.pop();
      return {
        samples: [...state.samples]
      };
    default:
      return state;
  }
};

export default dice;
