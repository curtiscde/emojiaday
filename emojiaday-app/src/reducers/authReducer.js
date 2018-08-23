export default function reducer(state = {
  accessToken: null,
  expiresAt: null,
  idToken: null,
  isAuthenticated: false,
}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        expiresAt: action.payload.expiresAt,
        idToken: action.payload.idToken,
        isAuthenticated: true,
      };
    }
    case 'LOGIN_EXPIRED': {
      return {
        ...state,
        accessToken: null,
        expiresAt: null,
        idToken: null,
        isAuthenticated: false,
      };
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        accessToken: null,
        expiresAt: null,
        idToken: null,
        isAuthenticated: false,
      };
    }
    default: {
      return state;
    }
  }
}
