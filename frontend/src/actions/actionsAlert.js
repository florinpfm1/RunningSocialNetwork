import { SET_ALERT, REMOVE_ALERT } from "./actionsConstants";
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType, timeout) => (dispatch) => {
  const id = uuidv4();
  console.log(msg, alertType, timeout);
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    })
  }, timeout);
};