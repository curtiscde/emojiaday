import moment from 'moment';

const createDayProperties = (entries) => {
  const data = {};
  entries.forEach((entry) => {
    const entryDateFormatted = moment(data).format('YYYYMMDD');
    if (!data[entryDateFormatted]) {
      data[entryDateFormatted] = {};
    }
    if (!data[entryDateFormatted][entry.index]) {
      data[entryDateFormatted][entry.index] = {
        date: entryDateFormatted,
        emoji: entry.emoji,
        entryid: entry.entryid,
        index: entry.index,
      };
    }
  });
  return data;
};

export default function reducer(state = {
  entries: {},
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_USER_ENTRIES_PENDING': {
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
      return {
        ...state,
        fetching: false,
        fetched: true,
        entries: createDayProperties(action.payload),
      };
    }
    case 'POST_USER_ENTRY_PENDING': {
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            [action.payload.index]: {
              ...state.entries[action.payload.date][action.payload.index],
              requestPending: true,
            },
          },
        },
      };
    }
    case 'UPDATE_USER_ENTRY_PENDING': {
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            [action.payload.index]: {
              ...state.entries[action.payload.date][action.payload.index],
              requestPending: true,
            },
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}
