import {RESET_TIMER, START_TIMER} from "../actions/pomodoroAction";

export const pomodoroInitialState = {
  pomodoro: {
    result: {
      interval: 0
    },
    config: {
      minute: 0,
      rest: 0
    },
    timer: {
      state: {
        isRest: true,
        isRunning: false,
        isPause: false,
      },
      countValue: 0,
    }
  }
}



export default function pomodoroReducer(state = pomodoroInitialState,action){
  if (action.type === START_TIMER && action.timerReference.current) {
      console.log("Timer Already Exist!")
      return;
    }
    // --------------------------------------------------
      if (state.pomodoro.timer.isPause) {
        return {
          ...state,
          timer: {
            ...state.pomodoro.timer,
            isPause: true,
            isRest: state.pomodoro.timer.state.isRest
          }
        }
      } else {
        state.pomodoro.timer.state.isPause = true
        state.pomodoro.timer.state.isRestState = !state.pomodoro.timer.state.isRest
      }
      return {
        ...state,
        timer: {
          ...state.pomodoro.timer,
          isRest: state.pomodoro.timer.state.isRest,
          isRunning: !state.pomodoro.timer.state.isRunning,
          isPause: state.pomodoro.timer.state.isPause
        }
      }
  return state
  }
    // ---------------------------------------------------
  if ()