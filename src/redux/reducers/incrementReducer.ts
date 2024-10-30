import {
  INCREMENT_TECHNOLOGY_WEIGHT,
  UPDATE_SUGGESTIONS,
} from '../actions/incrementAction';

const initialState = {
  // initial state for the reducer
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INCREMENT_TECHNOLOGY_WEIGHT:
      // handle incrementing technology weight
      return { ...state /* updated state */ };
    case UPDATE_SUGGESTIONS:
      // handle updating collection data
      return { ...state /* updated state */ };
    default:
      return state;
  }
};

export default reducer;
