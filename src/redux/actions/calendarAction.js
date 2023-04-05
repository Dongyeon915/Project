export const GET_CALENDAR_BY_USER = "GET_CALENDAR_BY_USER"

export function getCalendarUserInfoActionCreator(userResult) {
  return {
    type: GET_CALENDAR_BY_USER,
    userResult: userResult
  }
}