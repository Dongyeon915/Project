export const ADD_TODO = "ADD_TODO"

export function addTodoActionCreator(task) {
  return {
    type: ADD_TODO,
    task: task
  }
}