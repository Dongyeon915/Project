export const GET_LOGIN_INFO = "GET_LOGIN_INFO"

export function getLoginInfoAction(access_token,refresh_token){
  return {
    type: getLoginInfoAction,
    access_token:access_token,
    refresh_token:refresh_token
  }
}