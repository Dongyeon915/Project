import {
  CHANGE_REST_STATE,
  CHANGE_RUNNING_STATE,
  PLUS_INTERVER,
  RUN_TIMER,
  SET_COUNT_DOWN,
  SET_MINUTE,
  SET_PAUSE_STATE,
  SET_REST_TIME
} from "../../actions/pomodoroAction";

export const pomodoroInitialState = {
  result: {
    interval: 10
  },
  config: {
    minute: 50,
    rest: 10,
    countValue: 10
  },
  timer: {
    state: {
      isRest: false,
      isRunning: false,
      isPause: false,
    }
  }
}
export default function pomodoroReducer(state = pomodoroInitialState, action) {
  //  타이머의 카운트를 줄인다
  if (action.type === RUN_TIMER) {
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
    //   현재 미사용중 countDown 매개로 넣어서 정리중
  } else if (action.type === SET_MINUTE) {
    return {
      ...state,
      config: {
        ...state.config,
        minute: action.minute,
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
  } else if (action.type === CHANGE_REST_STATE) {
    return {
      ...state,
      timer: {
        ...state.timer,
        state: {
          ...state.timer.state,
          isRest: action.setRest,
          isRunning: false,
          isPause: false
        }
      }
    }
  } else if (action.type === PLUS_INTERVER) {
    return {
      ...state,
      result: {
        ...state.result,
        interval: state.result.interval + 1
      }
    }
  } else if (action.type === SET_REST_TIME) {
    return {
      ...state,
      config: {
        ...state.config,
        rest: action.restTime
      }
    }
  }
  return state
}
