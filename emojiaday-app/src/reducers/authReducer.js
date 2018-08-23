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
        accessToken: action.payload.authResult.accessToken,
        expiresAt: action.payload.expiresAt,
        idToken: action.payload.authResult.idToken,
        isAuthenticated: true,
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
