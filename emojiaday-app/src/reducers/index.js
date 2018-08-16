import { combineReducers } from 'redux';

import userEntriesDay from './userEntriesDayReducer';
import userEntries from './userEntriesReducer';

export default combineReducers({
  userEntriesDay,
  userEntries,
});
