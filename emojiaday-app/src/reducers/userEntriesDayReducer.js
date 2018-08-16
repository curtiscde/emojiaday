import moment from 'moment';

export default function reducer(state={
  entries: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'FETCH_USER_ENTRIES': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'FETCH_USER_ENTRIES_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case 'FETCH_USER_ENTRIES_FULFILLED': {

      let userEntriesByDay = [];
      action.payload.forEach((entry) => {
        const entryDateFormatted = moment(entry.date).startOf('day').toDate();
        userEntriesByDay.push({
          emoji: entry.emoji,
          date: entryDateFormatted,
        });
      });

      return {
        ...state,
        fetching: false,
        fetched: true,
        entries: userEntriesByDay
      };
    }
    default: {
      return state;
    }
  }
}
