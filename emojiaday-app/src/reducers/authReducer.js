export default function reducer(state = {
  isAuthenticated: false,
}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case 'LOGIN_FAILURE': {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default: {
      return state;
    }
  }
}
