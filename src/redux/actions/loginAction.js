export const GET_LOGIN_INFO = "GET_LOGIN_INFO"

export function getLoginInfoAction(access_token,refresh_token, userInfo){
  return {
    type: GET_LOGIN_INFO,
    access_token:access_token,
    refresh_token:refresh_token,
    userInfo: userInfo
  }
}