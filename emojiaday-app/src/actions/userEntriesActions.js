import axios from 'axios';
import Config from '../config';
import ReactGA from 'react-ga';

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

export function postUserEntry(emojiId, index, date) {
  return (dispatch) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    axios.post(`${Config.serviceUri}/api/entry/day`, {
      emoji: emojiId,
      index: this.props.index,
      date: moment().format('YYYYMMDD'),
    }).then((res) => {
      dispatch({ type: 'POST USER_ENTRY_FULFILLED', payload: res.data })
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
      this.props.dispatch(userEntries.fetchUserEntries());
    }).catch(error => {
      dispatch({ type: 'POST USER_ENTRY_REJECTED', payload: res.data })
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