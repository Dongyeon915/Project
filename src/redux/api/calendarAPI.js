import {getAllTodoActionCreator, getUserResult} from "../actions/todoAction";

// 처음 모든 result결과를 가져오기
export const fetchCalendarData = (accessToken, userId, setTodoResult) => {
  fetch(`/calendar/allUserCalendar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      user_id: userId
    })
  })
  .then(response => {
    if (response.status === 401) {
      throw new Error("Token 인증에 실패하였습니다.");
    } else if (response.status === 403) {
      throw new Error("접근 범위가 아닙니다.");
    } else if (response.status === 500) {
      throw new Error("서버 관리자에게 문의 해주세요");
    }
    return response.json();
  })
  .then(response => {
    setTodoResult(prevState => ({
      ...prevState,
      todoList: response
    }));
  })
  .catch(error => console.log(error.toLocaleString()));
};

//
export const fetchCalendarGetUserByResult = (accessToken,authInfo,date,dispatch) => {
  fetch(`/result`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      user_id: authInfo.userInfo.id,
      date: date
    })
  }).then(response => {
    if (response.status === 401) {
      throw new Error("Token 인증에 실패하였습니다.")
    }else if (response.status === 403){
      throw new Error("접근 범위가 아닙니다.")
    }else if (response.status === 500){
      throw new Error("서버 관리자에게 문의 해주세요")
    }
    return  response.json()
  }).then(result => {
    dispatch(getUserResult(result))
  }).catch(error => console.log(error.toLocaleString()))
};

// 해당일의 result가져오기
export const fetchCalendarGetUserByDateResult = (accessToken,authInfo,date,dispatch) => {
  fetch(`/schedules/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      user_id: authInfo.userInfo.id,
      date: date
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
  .then(newTodo => {
    dispatch(getAllTodoActionCreator(newTodo))
  }).catch(error => console.log(error))
}