export const ADD_TODO = "ADD_TODO"
export const COMPLETE_TODO = "COMPLETE_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const UPDATE_TODO = "UPDATE_TODO"


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
    taskID: taskID
  }
}

// todo리스트 삭제 이벤트
export function deleteTodoActionCreator(taskID){
  return {
    type: DELETE_TODO,
    taskID: taskID
  }
}

export function updateTodoActionCreator(taskID, updateTask){
  return {
    type: UPDATE_TODO,
    taskID: taskID,
    updateTask: updateTask
  }
}
