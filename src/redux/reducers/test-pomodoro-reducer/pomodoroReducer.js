import {
  CHANGE_REST_STATE,
  CHANGE_RUNNING_STATE,
  RUN_TIMER,
  SET_COUNT_DOWN,
  SET_MINUTE,
  SET_PAUSE_STATE,
  SET_RUNNING_STATE
} from "../../actions/pomodoroAction";

export const pomodoroInitialState = {
  result: {
    interval: 0
  },
  config: {
    minute: 25,
    rest: 0,
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
  // 타이머를 시작 한다
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
    //  타이머의 카운트를 줄인다
  } else if (action.type === RUN_TIMER) {
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
    //   타이머 분설정
  } else if (action.type === SET_MINUTE) {
    return {
      ...state,
      config: {
        ...state.config,
        minute: action.minute,
        countValue: state.config.minute * 60
      }
    }
    //   매개로 받은 time을 countDown: time * 60 카운트 벨류설정
  } else if (action.type === SET_COUNT_DOWN) {
    return {
      ...state,
      config: {
        ...state.config,
        countValue: action.countDown
      }
    }
  } else if (action.type === CHANGE_RUNNING_STATE) {
    return {
      ...state,
      timer: {
        ...state.timer,
        state: {
          ...state.timer.state,
          isRunning: true,
          isPause: false,
          isRest: false
        }
      }
    }
  } else if (action.type === SET_PAUSE_STATE) {
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
    // } else if (action.type === FUCK_YOU) {
    //   return {
    //     ...state,
    //     userInfo: action.userInfo
    //   }
  } else if (action.type === CHANGE_REST_STATE) {
    return {
      ...state,
      timer: {
        ...state.timer,
        state: {
          ...state.timer.state,
          isRest: true,
          isRunning: false
        }
      }
    }
  }

  return state
}
