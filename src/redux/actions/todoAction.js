export const ADD_TODO = "ADD_TODO"
export const COMPLETE_TODO = "COMPLETE_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const UPDATE_TODO = "UPDATE_TODO"
export const GET_ALL_TODO = "GET_ALL_TODO"

// clear와 rest를가져온다
export const GET_USER_RSULT = "GET_USER_RSULT"

// 체크 박스 업데이트 이벤트
export const UPDATE_CHECKBOX = "UPDATE_CHECKBOX"

export function getAllTodoActionCreator(todos) {
  return {
    type: GET_ALL_TODO,
    todoList: todos
  }
}

export function addTodoActionCreator(task) {
  return {
    type: ADD_TODO,
    task: task
  }
}

// 체크박스 클릭시 todo이벤트 완료
export function completeTodoActionCreator(taskID) {
  return {
    type: COMPLETE_TODO,
    taskId: taskID
  }
}

// todo리스트 삭제 이벤트
export function deleteTodoActionCreator(taskID){
  return {
    type: DELETE_TODO,
    taskID: taskID
  }
}

export function updateTodoActionCreator(updateTodo){
  return {
    type: UPDATE_TODO,
    // taskID: taskID,
    updateTodo: updateTodo
  }
}

export function checkBoxTodoActionCreator(updateTodo){
  return {
    type: UPDATE_CHECKBOX,
    checkBoxupdate: updateTodo
  }
}

export function getUserResult(result){
  return {
    type: GET_USER_RSULT,
    userResult: result
  }
}
