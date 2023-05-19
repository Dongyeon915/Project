
export const totalFetchData = (accesstoken,authInfo,setuserResult) =>{
  fetch(`/result/userId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accesstoken}`
    },
    body: JSON.stringify({
      user_id: authInfo.userInfo.id,
    })
  }).then(response => {
    if (response.status === 401) {
      throw new Error("Token 인증에 실패하였습니다.")
    }else if (response.status === 403){
      throw new Error("접근 범위가 아닙니다.")
    }else if (response.status === 500){
      throw new Error("서버 관리자에게 문의 해주세요")
    }
    return response.json()
  }).then(result => {
    setuserResult(prevState => {
      return {
        ...prevState,
        arrRest: result
      }
    })
  }).catch(error => console.log(error.toLocaleString()))
}

export const totalPomodoroFetchData = (accesstoken,authInfo,setuserInterval) => {
  fetch(`/pomodoro/userId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accesstoken}`
    },
    body: JSON.stringify({
      userId: authInfo.userInfo.id,
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
  .then(result => {
    setuserInterval(prevState => {
      return {
        ...prevState,
        intervalArr: result
      }
    })
  }).catch(error => console.log(error.toLocaleString()))
}