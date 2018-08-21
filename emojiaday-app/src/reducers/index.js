import { combineReducers } from 'redux';

import dayEntries from './dayEntriesReducer';
import entryEditor from './entryEditorReducer';
import userEntriesDay from './userEntriesDayReducer';
import userEntries from './userEntriesReducer';

export default combineReducers({
  dayEntries,
  entryEditor,
  userEntriesDay,
  userEntries,
});
