export const UserTotalState = {
  arrRest: []
}
export default function totalReducer(state = UserTotalState, action) {
  if (action.type == UserTotalState) {
    return {
      ...state,
      arrRest: action.totalUserResult,
    }
  }
  return state
}
