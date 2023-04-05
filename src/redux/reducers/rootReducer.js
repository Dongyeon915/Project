import {combineReducers} from "redux";
import pomodoroReducer from "./pomodoroReducer";
import todoReducer from "./todoReducer";
import todoResultReducer from "./calendarReducer";
// 하나의 리듀서를 교체할수 없으니 combineReducers를 store에넣어줘야함
export const rootReducer = combineReducers({
  todo: todoReducer,
  pomodoro: pomodoroReducer,
  todoResult: todoResultReducer
})