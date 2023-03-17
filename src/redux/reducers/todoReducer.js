import {
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  GET_ALL_TODO,
  UPDATE_CHECKBOX,
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
  if (action.type === GET_ALL_TODO) {
    const todoList = []
    action.todoList.forEach(todo => {
      todoList.push({
        taskId: todo.task_id,
        data: todo.date,
        complete: todo.checkbox_complete,
        completeTime: todo.complete_time,
        task: todo.todo_task
      })
    })
    return {
      ...state,
      list: todoList
    }
  } else if (action.type === ADD_TODO) {
    return {
      ...state,
      result: {
        ...state.result,
        rest: state.result.rest + 1
      },
      list: [
        ...state.list,
        {
          taskId: action.task.task_id,
          data: action.task.date,
          complete: action.task.checkbox_complete,
          completeTime: action.task.complete_time,
          task: action.task.todo_task
        }
      ]
    }
  } else if (action.type == COMPLETE_TODO) {
    let isComplete = false
    const todoList = state.list.filter(task => {
      if (task.taskId === action.taskId) {
        task.complete = action.task.checkbox_complete
        task.completeTime = action.task.completeTime
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
  //  체크박스 이벤트 사용중
  } else if (action.type == UPDATE_CHECKBOX) {
    const updateCheckBoxList = state.list.filter((todo) => {
      if (todo.taskId == action.taskId) {
        todo.complete = action.updateTodo.checkbox_complete
        todo.completeTime = action.updateTodo.complete_time
        return todo
      }
      return todo
    })
    return {
      ...state,
      list: updateCheckBoxList
    }
  }
  // 없는 액션타입은 꼭 state로 내보내 줘야한다.
  return state
}

