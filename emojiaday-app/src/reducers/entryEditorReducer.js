export default function reducer(state = {
  entry: null,
  dialogOpen: false,
}, action) {
  switch (action.type) {
    case 'OPEN_EDITOR_DIALOG': {
      return {
        ...state,
        day: action.payload.day,
        dialogOpen: true,
        entry: action.payload.entry,
        index: action.payload.index,
      };
    }
    case 'CLOSE_EDITOR_DIALOG': {
      return {
        ...state,
        dialogOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}
