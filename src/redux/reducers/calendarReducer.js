import {GET_CALENDAR_BY_USER} from "../actions/calendarAction";

const initialState = {
    userId: null,
    date: null,
    clear: 0,
    rest: 0
}



export default function todoResultReducer(state = initialState, action) {
  if (action.type === GET_CALENDAR_BY_USER) {
      return {
        ...state,
        date: action.userResult.date,
        rest: action.userResult.rest_task,
        clear: action.userResult.clear_task,
        userId: action.userResult.user_id
    }
  }
  return state
}