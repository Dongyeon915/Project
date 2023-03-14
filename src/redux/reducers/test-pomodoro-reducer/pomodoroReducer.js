import {
  CHANGE_RUNNING_STATE,
  COUNT_DOWN, FUCK_YOU,
  PAUSE_TIMER,
  RESET_TIMER,
  RUN_TIMER,
  SET_COUNT_DOWN,
  SET_MINUTE,
  SET_PAUSE_STATE,
  SET_RUNNING_STATE,
  START_TIMER
} from "../../actions/pomodoroAction";

export const pomodoroInitialState = {
  result: {
    interval: 0
  },
  config: {
    minute: 1,
    rest: 10,
    countValue: 0
  },
  timer: {
    state: {
      isRest: true,
      isRunning: false,
      isPause: false,
    }
  }
}


export default function pomodoroReducer(state = pomodoroInitialState, action) {
  if (action.type === SET_RUNNING_STATE) {
    return {
      ...state,
      timer: {
        ...state.timer,
        state: {
          ...state.timer.state,
          isRest: false,
          isRunning: true,
          isPause: false
        }
      }
    }
  } else if (action.type === SET_MINUTE) {
    return {
      ...state,
      config: {
        ...state.config,
        minute: action.minute
      }
    }
  }else if (action.type === RUN_TIMER) {
    return {
      ...state,
      config: {
       ...state.config,
       countValue: state.config.countValue - 1
      },
      timer: {
        ...state.timer
      }
    }
  } else if (action.type === SET_COUNT_DOWN){
    return {
      ...state,
      config: {
        ...state.config,
        countValue: action.countDown
      }
    }
  }else if (action.type === CHANGE_RUNNING_STATE){
    return {
      ...state,
      timer: {
        ...state.timer,
        isRunning: true,
        isPause: false
      }
    }
  } else if (action.type === SET_PAUSE_STATE){
    return {
      ...state,
      timer: {
        ...state.timer,
        state: {
          ...state.timer.state,
          isPause: true,
          isRunning: false
        }
      }
    }
  } else if (action.type === FUCK_YOU) {
    return {
      ...state,
      userInfo: action.userInfo
    }
  }

  return state
}
