import {ADD_TODO} from "../actions/todoAction";

const initialState = {
  result: {
    clear: 0,
    rest: 0,
  },
  list: [
    {
      taskId: 1,
      task: "씻기",
      complete: false,
      completeTime: undefined
    }
  ]
}

// 초기값이 없다면 initialStat 값으로 세팅
export default function todoReducer(state = initialState, action) {
  if (action.type === ADD_TODO) {
    return {
      ...state,
      result: {
        ...state.result,
        rest: state.result.rest + 1
      },
      list: [
          ...state.list,
        {
          taskId: state.list.length + 1,
          task: action.task,
          complete: false,
          completeTime: undefined
        }
      ]
    }
  }
  return state
}
