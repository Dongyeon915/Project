export const GET_USER_RESULT = "GET_USER_RESULT"

export function getUserResultActionCreator(totalUserResult) {
  return {
    type: GET_USER_RESULT,
    totalUserResult: totalUserResult
  }
}