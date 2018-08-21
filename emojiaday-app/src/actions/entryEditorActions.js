export default function openDialog(entry) {
  return (dispatch) => {
    dispatch({ type: 'OPEN_EDITOR_DIALOG', payload: entry });
  };
}
