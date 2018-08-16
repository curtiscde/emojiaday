import moment from 'moment';

export default function reducer(state = {
  entries: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_USER_ENTRIES': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'FETCH_USER_ENTRIES_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    case 'FETCH_USER_ENTRIES_FULFILLED': {
      const userEntriesByDay = action.payload.filter(entry => action.payload
        .filter(entryCompare => moment(entryCompare.date).startOf('day').diff(moment(entry.date).startOf('day'), 'days') === 0
          && entryCompare.index < entry.index).length === 0);

      return {
        ...state,
        fetching: false,
        fetched: true,
        entries: userEntriesByDay,
      };
    }
    default: {
      return state;
    }
  }
}
