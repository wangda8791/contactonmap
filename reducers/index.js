import { types } from "../actions/ContactAction";

const initialState = {
  contacts: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CONTACT_LOADED:
      return {
        ...state,
        contacts: [...action.payload]
      };
    default:
      return state;
  }
};
