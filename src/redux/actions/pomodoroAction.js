
export const SET_RUNNING_STATE = "SET_RUNNING_STATE"
export const SET_COUNT_DOWN = "SET_COUNT_DOWN"
export const RUN_TIMER = "RUN_TIMER"

// 시간설정
export const SET_MINUTE = "SET_MINUTE"

export const CHANGE_RUNNING_STATE = "CHANGE_RUNNING_STATE"

export const SET_PAUSE_STATE = "SET_PAUSE_STATE"

export const FUCK_YOU = "FUCK_YOU"

export function fuckYou(userInfo) {
  return {
    type: FUCK_YOU,
    userInfo: userInfo
  }
}


export function setInputMinnute(input){
  return {
    type: SET_MINUTE,
    minnute: input
  }
}

// start timer
export function setRunningStateActionCreator(){
  return {
    type: SET_RUNNING_STATE
  }
}

// COUNT_DOWN
export function runTimerActionCreator() {
  return {
    type: RUN_TIMER
  }
}

export function setTimeActionCreator(time, isResume=false) {
  if (isResume) {
    return {
      type: SET_COUNT_DOWN,
      countDown: time
    }
  }
  return {
    type: SET_COUNT_DOWN,
    countDown: time * 60
  }
}

export function changeRestStateActionCreator(){
  return {
    type: CHANGE_RUNNING_STATE
  }
}

export function changePauseStateActionCreator(){
  return {
    type: SET_PAUSE_STATE
  }
}