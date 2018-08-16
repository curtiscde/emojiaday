import axios from 'axios';
import Config from '../config';

export function fetchDayEntries(day) {
  return function(dispatch) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    axios.get(`${Config.serviceUri}/api/entries/day/${day}`)
      .then(res => {
        dispatch({ type: 'FETCH_DAY_ENTRIES_FULFILLED', payload: {
          day: day,
          data: res.data,
        }});
      })
      .catch(error => {
        dispatch({ type: 'FETCH_DAY_ENTRIES_REJECTED', payload: error });
      });
  };
}
