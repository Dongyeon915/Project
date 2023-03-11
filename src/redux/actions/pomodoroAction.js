
export const START_TIMER = "START_TIMER"
export const RESET_TIMER = "RESET_TIMER"

export function startTimerActionCreator(timerReference){
  return {
    type : START_TIMER,
    timerReference: timerReference
  }
}

export function resetTimerActionCreator() {
  return {
    type : RESET_TIMER
  }
}