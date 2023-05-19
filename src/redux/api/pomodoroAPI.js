import {
  setInputMinute,
  setRestTimeStateActionCreator,
  setTimeActionCreator
} from "../actions/pomodoroAction";

export const fetchPomodoroData = (accessToken,authInfo,dispatch) => {
  fetch(`/pomodoro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      "userId": authInfo.userInfo.id,
      "date": new Date().toISOString().split("T")[0]
    })
  }).then(response => {
    if (response.status === 401) {
      throw new Error("Token 인증에 실패하였습니다.")
    } else if (response.status === 400) {
      throw new Error("접근 범위가 아닙니다.")
    } else if (response.status === 500) {
      throw new Error("서버 관리자에게 문의 해주세요")
    }
    return response.json()
  })
  .then(pomodoroInfo => {
    dispatch(setTimeActionCreator(pomodoroInfo.minute))
    dispatch(setInputMinute(pomodoroInfo.minute))
    dispatch(setRestTimeStateActionCreator(pomodoroInfo.rest))
  }).catch(err => {
    console.log(err.toLocaleString())
  })
}

export const fetchPomodoroCoutZero = (accessToken,authInfo,pomodoro,apiURL) => {
  fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      userId: authInfo.userInfo.id,
      minute: pomodoro.config.minute,
      rest: pomodoro.config.rest,
      date: new Date().toISOString().split("T")[0]
    })
  }).then(response => {
    if (response.status === 401) {
      throw new Error("Token 인증에 실패하였습니다.")
    } else if (response.status === 403) {
      throw new Error("접근 범위가 아닙니다.")
    } else if (response.status === 500) {
      throw new Error("서버 관리자에게 문의 해주세요")
    }
    return response.json()
  })
  .catch(error => console.log(error.toLocaleString()))
}
