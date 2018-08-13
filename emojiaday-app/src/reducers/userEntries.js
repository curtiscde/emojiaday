export default function reducer(state={
    entries: [],
    fetching: false,
    fetched: false,
    error: null
}, action) {

    switch(action.type){
        case 'FETCH_USER_ENTRIES': {
            return {
                ...state,
                fetching: true
            }
        }
        case 'FETCH_USER_ENTRIES_REJECTED': {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
        case 'FETCH_USER_ENTRIES_FULFULLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                entries: action.payload
            }
        }
        default: {
            return state;
        }
    }


}

