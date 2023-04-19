import {TILL_PAGE_VALUE} from "../actions/tilAction";

const initialState = {
  pageValue: 1
}
export default function tilReducer(state = initialState,action){
  if (action.type === TILL_PAGE_VALUE){
    return {
      ...state,
      pageValue: action.tilPageValue
    }
  }
  return state
}