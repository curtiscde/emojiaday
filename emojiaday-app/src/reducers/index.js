import { combineReducers } from 'redux';

import auth from './authReducer';
import dayEntries from './dayEntriesReducer';
import entryEditor from './entryEditorReducer';
import userEntriesDay from './userEntriesDayReducer';
import userEntries from './userEntriesReducer';

export default combineReducers({
  auth,
  dayEntries,
  entryEditor,
  userEntriesDay,
  userEntries,
});
