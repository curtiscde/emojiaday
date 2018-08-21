export function openDialog(day, index, entry) {
  return (dispatch) => {
    dispatch({ type: 'OPEN_EDITOR_DIALOG', payload: { day, index, entry } });
  };
}

export function closeDialog() {
  return (dispatch) => {
    dispatch({ type: 'CLOSE_EDITOR_DIALOG' });
  };
}
