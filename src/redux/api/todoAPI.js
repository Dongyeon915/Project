import {
  addTodoActionCreator, completeTodoActionCreator, deleteTodoActionCreator,
  getAllTodoActionCreator,
  getUserResult, updateTodoActionCreator
} from "../actions/todoAction";

export const fetchTodoUserByDate = (accesstoken,authInfo,dispatch,getTodoResult) => {
  fetch(`/schedules/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accesstoken}`
    },
    body: JSON.stringify({
      user_id: authInfo.userInfo.id,
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
  }).then(newTodo => {
    // console.log(newTodo)
    dispatch(getAllTodoActionCreator(newTodo))
    // getTodoResult(accesstoken)
  }).catch(error => {
    console.log(error.toLocaleString())
  })
}

// rest와 clear를 해당 유저로 세팅하기 useEffect 사용시 무한네트워크 요청으로 함수로빼서 관리
export const fetchGetTodoResult = (accessToken,authInfo,dispatch) => {
  fetch(`/result`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      user_id: authInfo.userInfo.id,
      date: new Date().toISOString().split("T")[0],
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
  }).then(result => {
    dispatch(getUserResult(result))
  }).catch(error => console.log(error.toLocaleString()))
}

// todo를 입력하는 fetch
export const fetchUpdateTodo = (accesstoken,todoInput,authInfo,dispatch) => {
  fetch("/schedules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accesstoken}`
    },
    body: JSON.stringify({
      todo_task: todoInput.current.value,
      checkbox_complete: false,
      user_id: authInfo.userInfo.id,
      date: new Date().toISOString().split("T")[0],
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
    dispatch(addTodoActionCreator(newTodo))
    todoInput.current.value = ""
  }).catch(error => {
    console.log(error.toLocaleString());
  })
}

// todo 완료시
export const fetchTodoComplete = (event, index,dispatch,accesstoken,authInfo) => {
  dispatch(completeTodoActionCreator(index))
  fetch(`/schedules/checkbox/${index}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accesstoken}`
    },
    body: JSON.stringify({
      task_id: index,
      user_id: authInfo.userInfo.id,
      date: new Date().toISOString().split("T")[0],
      checkbox_complete: event.target.checked,
      complete_time: Date.now().toString()
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
  }).catch(error => {
    console.log(error.toLocaleString())
    dispatch(completeTodoActionCreator(index))
  })
}

// 삭제버튼 이벤트
export const fetchDeleteTodo = (event, index,accesstoken,dispatch,deleteTaskResult) => {
  fetch(`/schedules/${index}`, {
    headers: {
      "Authorization": `Bearer ${accesstoken}`
    },
    method: "DELETE"
  }).then(response => {
    if (response.status === 401) {
      throw new Error("Token 인증에 실패하였습니다.")
    } else if (response.status === 403) {
      throw new Error("접근 범위가 아닙니다.")
    } else if (response.status === 500) {
      throw new Error("서버 관리자에게 문의 해주세요")
    }
    return response.json()
  }).then(response => {
    dispatch(deleteTodoActionCreator(index))
    deleteTaskResult()
  }).catch(error => console.log(error.toLocaleString()))
}

// task삭제시 result갯수 줄여주기
export const fetchDeleteTodoResult = (accesstoken,authInfo) => {
  fetch("/schedules", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accesstoken}`
    },
    body: JSON.stringify({
      user_id: authInfo.userInfo.id,
      date: new Date().toISOString().split("T")[0],
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
  }).catch(error => {
    console.log(error.toLocaleString())
  })
}

// 업데이트 value저장
export const fetchPutTodo = (setUpdate,accesstoken,todoInput,authInfo,dispatch,event,index,updateState) => {
  fetch("/schedules", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accesstoken}`
    },
    body: JSON.stringify({
      user_id: authInfo.userInfo.id,
      task_id: index,
      todo_task: updateState.task
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
  }).then(updateTodo => {
    dispatch(updateTodoActionCreator(updateTodo))
  }).catch(error => {
    console.log(error.toLocaleString())
  })
  setUpdate(prevState => {
    return {
      ...prevState,
      state: false
    }
  })
}