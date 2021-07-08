import { AUTHENTICATE, LOADED, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        isLoading: false,
      };
    case LOADED:
      return {
        token: null,
        userId: null,
        isLoading: false,
      };
    case LOGOUT:
      return {
        token: null,
        userId: null,
        isLoading: false,
      };

    default:
      return state;
  }
};
