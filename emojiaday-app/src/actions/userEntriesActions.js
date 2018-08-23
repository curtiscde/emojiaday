import axios from 'axios';
import ReactGA from 'react-ga';
import Config from '../config';

const AUTH_ACCESS_TOKEN = 'auth_access_token';

export function fetchUserEntries() {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER_ENTRIES_PENDING' });
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(AUTH_ACCESS_TOKEN)}`;
    axios.get(`${Config.serviceUri}/api/entries/user`)
      .then((res) => {
        dispatch({ type: 'FETCH_USER_ENTRIES_FULFILLED', payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_USER_ENTRIES_REJECTED', payload: error });
      });
  };
}

export function addUserEntry(emojiId, index, date) {
  return (dispatch) => {
    dispatch({ type: 'POST_USER_ENTRY_PENDING', payload: { date, index } });
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(AUTH_ACCESS_TOKEN)}`;
    axios.post(`${Config.serviceUri}/api/entry/day`, {
      emoji: emojiId,
      index,
      date,
    }).then((res) => {
      dispatch({ type: 'POST_USER_ENTRY_FULFILLED', payload: res.data });
      ReactGA.event({
        category: 'Emoji Entry',
        action: 'Add',
        label: emojiId,
      });
      dispatch(fetchUserEntries());
    }).catch((error) => {
      dispatch({ type: 'POST_USER_ENTRY_REJECTED', payload: error });
      ReactGA.event({
        category: 'Error',
        action: 'Emoji Entry Add',
      });
    });
  };
}

export function updateUserEntry(entry, emoji) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_USER_ENTRY_PENDING', payload: entry });
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(AUTH_ACCESS_TOKEN)}`;
    axios.put(`${Config.serviceUri}/api/entry/day`, {
      entryid: entry.entryid,
      emoji,
    }).then((res) => {
      dispatch({ type: 'UPDATE_USER_ENTRY_FULFILLED', payload: res.data });
      dispatch(fetchUserEntries());
      ReactGA.event({
        category: 'Emoji Entry',
        action: 'Update',
        label: emoji,
      });
      fetchUserEntries();
    }).catch((error) => {
      dispatch({ type: 'UPDATE_USER_ENTRY_REJECTED', payload: error });
      ReactGA.event({
        category: 'Error',
        action: 'Emoji Entry Update',
      });
    });
  };
}
