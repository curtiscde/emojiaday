import axios from 'axios'

export function fetchUserEntries(){
    return function(dispatch){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        axios.get(`${Config.serviceUri}/api/entries/user`)
        .then(res => {
            dispatch({ type: 'FETCH_USER_ENTRIES_FULFILLED', payload: res.data })
        })
        .catch(error => {
            dispatch({ type: 'FETCH_USER_ENTRIES_FULFILLED', payload: error })
        });
    }
}