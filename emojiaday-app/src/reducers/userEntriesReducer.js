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
        emoji: entry.emoji,
        entryid: entry._id,
      };
    }
  });
  return data;
};

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
      return {
        ...state,
        fetching: false,
        fetched: true,
        entries: createDayProperties(action.payload),
      };
    }
    default: {
      return state;
    }
  }
}
