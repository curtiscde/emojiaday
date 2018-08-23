export default function reducer(state = {
  accessToken: null,
  idToken: null,
}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        accessToken: action.payload.authResult.accessToken,
        expiresAt: action.payload.expiresAt,
        idToken: action.payload.authResult.idToken,
      };
    }
    default: {
      return state;
    }
  }
}
