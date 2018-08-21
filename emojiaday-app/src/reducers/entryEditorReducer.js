export default function reducer(state = {
  entry: null,
  dialogOpen: false,
}, action) {
  switch (action.type) {
    case 'OPEN_EDITOR_DIALOG': {
      return {
        ...state,
        dialogOpen: true,
      };
    }
    default: {
      return state;
    }
  }
}
