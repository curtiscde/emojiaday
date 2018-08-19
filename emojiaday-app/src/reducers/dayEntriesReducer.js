export default function reducer(state = {
  days: {},
}, action) {
  switch (action.type) {
    case 'FETCH_DAY_ENTRIES': {
      return {
        ...state,
      };
    }
    case 'FETCH_DAY_ENTRIES_REJECTED': {
      return {
        ...state,
        days: {
          ...state.days,
          [action.payload.day]: {
            fetching: false,
            error: action.payload.error,
          },
        },
      };
    }
    case 'FETCH_DAY_ENTRIES_FULFILLED': {
      return {
        ...state,
        days: {
          ...state.days,
          [action.payload.day]: {
            fetching: false,
            fetched: true,
            topEmojis: action.payload.data.topEmojis,
          },
        },
      };
    }
    default: {
      return state;
    }
  }


}

