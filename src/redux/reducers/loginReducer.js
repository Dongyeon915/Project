import {GET_LOGIN_INFO} from "../actions/loginAction";

const initialState = {
  isAuthenticated: false,
  access_token: null,
  refresh_token: null
}

export default function loginReducer(state = initialState, action) {
  if (action.type === GET_LOGIN_INFO) {
      return {
        ...state,
        isAuthenticated: true,
        access_token: action.access_token,
        refresh_token: action.refresh_token
    }
  }
  return state
}