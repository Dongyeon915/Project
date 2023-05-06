import {GET_LOGIN_INFO} from "../actions/loginAction";

const initialState = {
  isAuthenticated: false,
  access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLrj5nsl7AiLCJwcm9maWxlIjoiaHR0cDovL2sua2FrYW9jZG4ubmV0L2RuL2RwazlsMS9idHFtR2hBMmxLTC9PejB3RHVKbjFZVjJESW45MmY2RFZLL2ltZ182NDB4NjQwLmpwZyIsImlkIjoiMjcyMTc1MDI0OCIsImV4cCI6MTY4MzM3NzI3MywiZW1haWwiOiJlaGQ5NTY3QG5hdmVyLmNvbSJ9.GP3V2QAee_gxQn_SG5cF9HHfNt8T4nsYJWZepcNgfs0XUMtJXSgk62w6-6xR1lsQ6SChydGHQtpOzfl-r2T-gg",
  refresh_token: null
}

export default function loginReducer(state = initialState, action) {
  if (action.type === GET_LOGIN_INFO) {
      return {
        ...state,
    }
  }
  return state
}