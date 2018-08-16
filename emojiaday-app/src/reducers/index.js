import { combineReducers } from 'redux';

import dayEntries from './dayEntriesReducer';
import userEntriesDay from './userEntriesDayReducer';
import userEntries from './userEntriesReducer';

export default combineReducers({
  dayEntries,
  userEntriesDay,
  userEntries,
});
