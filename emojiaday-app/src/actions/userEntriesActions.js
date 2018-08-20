import axios from 'axios';
import ReactGA from 'react-ga';
import moment from 'moment';
import Config from '../config';

export function fetchUserEntries() {
  return function(dispatch){
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    axios.get(`${Config.serviceUri}/api/entries/user`)
    .then(res => {
        dispatch({ type: 'FETCH_USER_ENTRIES_FULFILLED', payload: res.data })
    })
    .catch(error => {
        dispatch({ type: 'FETCH_USER_ENTRIES_REJECTED', payload: error })
    });
  }
}

export function addUserEntry(emojiId, index, date) {
  return (dispatch) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    axios.post(`${Config.serviceUri}/api/entry/day`, {
      emoji: emojiId,
      index,
      date,
    }).then((res) => {
      dispatch({ type: 'POST_USER_ENTRY_FULFILLED', payload: res.data });
      // this.setState({
      //   ...this.state,
      //   emoji: res.data.emoji,
      //   entryId: res.data._id,
      //   iconRequest: false
      // });
      ReactGA.event({
        category: 'Emoji Entry',
        action: 'Add',
        label: emojiId
      });
      fetchUserEntries();
    }).catch(error => {
      dispatch({ type: 'POST_USER_ENTRY_REJECTED', payload: error })
      // this.setState({
      //   ...this.state,
      //   iconRequest: false
      // });
      ReactGA.event({
        category: 'Error',
        action: 'Emoji Entry Add'
      });
    });
  };
}