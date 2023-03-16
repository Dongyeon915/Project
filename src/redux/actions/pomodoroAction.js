// export const SET_RUNNING_STATE = "SET_RUNNING_STATE"
export const SET_COUNT_DOWN = "SET_COUNT_DOWN"
export const RUN_TIMER = "RUN_TIMER"

// 시간설정
export const SET_MINUTE = "SET_MINUTE"

export const CHANGE_RUNNING_STATE = "CHANGE_RUNNING_STATE"

export const SET_PAUSE_STATE = "SET_PAUSE_STATE"

export const FUCK_YOU = "FUCK_YOU"

// 카운트 0일시 휴식중이 아니라면 휴식으로 바꾸는 action
export const CHANGE_REST_STATE = "CHANGE_REST_STATE"

// interver 올리는 액션
export const PLUS_INTERVER = "PLUS_INTERVER"

// rest설정 액션
export const SET_REST_TIME = "SET_REST_TIME"

export function setInputMinute(minute) {
  return {
    type: SET_MINUTE,
    minute: minute
  }
}

// COUNT_DOWN
export function runTimerActionCreator() {
  return {
    type: RUN_TIMER
  }
}

export function setTimeActionCreator(time) {
  return {
    type: SET_COUNT_DOWN,
    countDown: time * 60
  }
}

// start timer
export function changeRunningStateActionCreator() {
  return {
    type: CHANGE_RUNNING_STATE
  }
}

export function changePauseStateActionCreator() {
  return {
    type: SET_PAUSE_STATE
  }
}

export function changeRestStateActionCreator(setRest) {
  return {
    type: CHANGE_REST_STATE,
    setRest: setRest
  }
}

export function setInterverStateActionCreator() {
  return {
    type: PLUS_INTERVER
  }
}

export function setRestTimeStateActionCreator(restTime) {
  return {
    type: SET_REST_TIME,
    restTime: restTime
  }
}