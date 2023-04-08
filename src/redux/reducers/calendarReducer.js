import {GET_CALENDAR_BY_USER} from "../actions/calendarAction";

const initialState = {
  list:[]
      // userId: null,
      // date: null,
      // clear: 0,
      // rest: 0,
}



export default function todoResultReducer(state = initialState, action) {
  if (action.type === GET_CALENDAR_BY_USER) {
    const arr = []
    action.userResult.forEach(result => {
      arr.push({
        date: result.date,
        rest: result.rest_task,
        clear: result.clear_task,
        userId: result.user_id
      })
    })
      return {
        ...state,
        list: arr
    }
  }
  return state
}