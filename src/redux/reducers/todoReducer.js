import {
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from "../actions/todoAction";

const initialState = {
  result: {
    clear: 0,
    rest: 0,
  },
  list: []
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
  } else if (action.type == COMPLETE_TODO) {
    let isComplete = false
    const todoList = state.list.filter(task => {
      if(task.taskId === action.taskID) {
        task.complete = !task.complete
        task.completeTime = new Date().toLocaleTimeString()
        isComplete = task.complete
      }
      return task
    })
    let restCount = state.result.rest, clearCount = state.result.clear
    if (isComplete) {
      restCount--
      clearCount++
    } else {
      restCount++
      clearCount--
    }
    return {
      ...state,
      result: {
        clear: clearCount,
        rest: restCount
      },
      list: todoList
    }
  } else if (action.type == DELETE_TODO) {
    // event를 todoItem으로 읽기 좋게 변경 사용
    const todoList = state.list.filter(task => {
      if (task.taskId !== action.taskID) {
        return task
      }
    })
    return {
      ...state,
      result: {
        ...state.result,
        rest: state.result.rest - 1
      },
      list: todoList
    }
  } else if (action.type == UPDATE_TODO) {
    const updateTodoList = state.list.filter((task) => {
      if (task.taskId == action.taskID) {
        task.task = action.updateTask
        return task
      }
      return task
    })
    return {
      ...state,
      list: updateTodoList
    }
  }
  // 없는 액션타입은 꼭 state로 내보내 줘야한다.
  return state
}

