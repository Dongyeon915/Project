import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  Input,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {useEffect, useRef, useState} from "react";
import {AlarmOn, Favorite, FavoriteBorder} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import CancelIcon from '@mui/icons-material/Cancel';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import '@toast-ui/editor/dist/toastui-editor.css';
import {
  fetchDeleteTodo,
  fetchDeleteTodoResult,
  fetchGetTodoResult,
  fetchPutTodo,
  fetchTodoComplete,
  fetchTodoUserByDate,
  fetchUpdateTodo
} from "../../../redux/api/todoAPI";

export default function TodoComp() {

  const [updateState, setUpdate] = useState({
    task: '',
    state: false
  })

  const todo = useSelector(state => state.todo)
  const dispatch = useDispatch()

  const authInfo = useSelector(state => state.login)
  //  Redux Store에서 꺼내온다!
  const accesstoken = authInfo.access_token;

  // // 인풋을 따로 관리 하지않으면 useEffect 의미가없다 계속 내부 값이 변경되기때문에
  // const [inputState, setInputState] = useState({
  //   todoInput: ''
  // })
  const todoInput = useRef()

  // userID와 오늘의 date가 일치하는 정보만 가져온다
  useEffect(() => {
    // fetch(`/schedules/user`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${accesstoken}`
    //   },
    //   body: JSON.stringify({
    //     user_id: authInfo.userInfo.id,
    //     date: new Date().toISOString().split("T")[0]
    //   })
    // }).then(response => {
    //   if (response.status === 401) {
    //     throw new Error("Token 인증에 실패하였습니다.")
    //   } else if (response.status === 403) {
    //     throw new Error("접근 범위가 아닙니다.")
    //   } else if (response.status === 500) {
    //     throw new Error("서버 관리자에게 문의 해주세요")
    //   }
    //   return response.json()
    // }).then(newTodo => {
    //   // console.log(newTodo)
    //   dispatch(getAllTodoActionCreator(newTodo))
    //   getTodoResult(accesstoken)
    // }).catch(error => {
    //   console.log(error.toLocaleString())
    // })
    fetchTodoUserByDate(accesstoken, authInfo, dispatch)
    getTodoResult(accesstoken)
  }, [])

  // rest와 clear를 해당 유저로 세팅하기 useEffect 사용시 무한네트워크 요청으로 함수로빼서 관리
  const getTodoResult = (accessToken) => {
    // fetch(`/result`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${accessToken}`
    //   },
    //   body: JSON.stringify({
    //     user_id: authInfo.userInfo.id,
    //     date: new Date().toISOString().split("T")[0],
    //   })
    // }).then(response => {
    //   if (response.status === 401) {
    //     throw new Error("Token 인증에 실패하였습니다.")
    //   } else if (response.status === 403) {
    //     throw new Error("접근 범위가 아닙니다.")
    //   } else if (response.status === 500) {
    //     throw new Error("서버 관리자에게 문의 해주세요")
    //   }
    //   return response.json()
    // }).then(result => {
    //   dispatch(getUserResult(result))
    // }).catch(error => console.log(error.toLocaleString()))
    fetchGetTodoResult(accessToken, authInfo, dispatch)
  }

  const todoUpdateAPI = (accesstoken, todoInput, authInfo, dispatch) => {
    // fetch("/schedules", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${accesstoken}`
    //   },
    //   body: JSON.stringify({
    //     todo_task: todoInput.current.value,
    //     checkbox_complete: false,
    //     user_id: authInfo.userInfo.id,
    //     date: new Date().toISOString().split("T")[0],
    //   })
    // }).then(response => {
    //   if (response.status === 401) {
    //     throw new Error("Token 인증에 실패하였습니다.")
    //   } else if (response.status === 403) {
    //     throw new Error("접근 범위가 아닙니다.")
    //   } else if (response.status === 500) {
    //     throw new Error("서버 관리자에게 문의 해주세요")
    //   }
    //   return response.json()
    // })
    // .then(newTodo => {
    //   dispatch(addTodoActionCreator(newTodo))
    //   todoInput.current.value = ""
    // }).catch(error => {
    //   console.log(error.toLocaleString());
    // })
    fetchUpdateTodo(accesstoken, todoInput, authInfo, dispatch)
  }

  const todoComplete = (event, index) => {
    // dispatch(completeTodoActionCreator(index))
    // fetch(`/schedules/checkbox/${index}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${accesstoken}`
    //   },
    //   body: JSON.stringify({
    //     task_id: index,
    //     user_id: authInfo.userInfo.id,
    //     date: new Date().toISOString().split("T")[0],
    //     checkbox_complete: event.target.checked,
    //     complete_time: Date.now().toString()
    //   })
    // }).then(response => {
    //   if (response.status === 401) {
    //     throw new Error("Token 인증에 실패하였습니다.")
    //   } else if (response.status === 403) {
    //     throw new Error("접근 범위가 아닙니다.")
    //   } else if (response.status === 500) {
    //     throw new Error("서버 관리자에게 문의 해주세요")
    //   }
    //   return response.json()
    // }).catch(error => {
    //   console.log(error.toLocaleString())
    //   dispatch(completeTodoActionCreator(index))
    // })
    fetchTodoComplete(event, index, dispatch, accesstoken, authInfo)
  }

  const addTodoEventHandler = (e) => {
    if (e.type === 'keydown') {
      if (e.key === 'Enter' && todoInput.current.value.length != 0) {
        todoUpdateAPI(accesstoken, todoInput, authInfo, dispatch)
      } else if (e.key === 'Enter') {
        alert("Todo를 입력해주세요")
      }
    } else {
      if (todoInput.current.value == 0) {
        alert("Todo를 입력해주세요")
        return
      } else if (todoInput.current.value.length != 0) {
        todoUpdateAPI(accesstoken, todoInput, authInfo, dispatch)
      }
    }
  }

// 삭제버튼 이벤트
  const deleteEvent = (event, index) => {
    // fetch(`/schedules/${index}`, {
    //   headers: {
    //     "Authorization": `Bearer ${accesstoken}`
    //   },
    //   method: "DELETE"
    // }).then(response => {
    //   if (response.status === 401) {
    //     throw new Error("Token 인증에 실패하였습니다.")
    //   } else if (response.status === 403) {
    //     throw new Error("접근 범위가 아닙니다.")
    //   } else if (response.status === 500) {
    //     throw new Error("서버 관리자에게 문의 해주세요")
    //   }
    //   return response.json()
    // }).then(response => {
    //   dispatch(deleteTodoActionCreator(index))
    //   deleteTaskResult()
    // }).catch(error => console.log(error.toLocaleString()))
    fetchDeleteTodo(event, index, accesstoken, dispatch, deleteTaskResult)
  }

  // task삭제시 result갯수 줄여주기
  const deleteTaskResult = () => {
    // fetch("/schedules", {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${accesstoken}`
    //   },
    //   body: JSON.stringify({
    //     user_id: authInfo.userInfo.id,
    //     date: new Date().toISOString().split("T")[0],
    //   })
    // }).then(response => {
    //   if (response.status === 401) {
    //     throw new Error("Token 인증에 실패하였습니다.")
    //   } else if (response.status === 403) {
    //     throw new Error("접근 범위가 아닙니다.")
    //   } else if (response.status === 500) {
    //     throw new Error("서버 관리자에게 문의 해주세요")
    //   }
    //   return response.json()
    // }).catch(error => {
    //   console.log(error.toLocaleString())
    // })
    fetchDeleteTodoResult(accesstoken, authInfo)
  }

// // 업데이트 이벤트
//   수정버튼
  const updateBtnEvent = (event, index) => {
    const updateItem = true
    const todoList = todo.list.find(task => {
      if (task.taskId === index) {
        return task
      }
    })
    setUpdate(prevState => {
      return {
        ...prevState,
        state: updateItem,
        index: index,
        // 배열을 반환시 필터
        task: todoList.task
      }
    })
  }

// 업데이트 value저장
  const editUpdate = (e) => {
    // console.log(e.target.value)
    setUpdate(prevState => {
      return {
        ...prevState,
        task: e.target.value
      }
    })
  }
  const updateContentBtn = (event, index) => {
    // fetch("/schedules", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${accesstoken}`
    //   },
    //   body: JSON.stringify({
    //     user_id: authInfo.userInfo.id,
    //     task_id: index,
    //     todo_task: updateState.task
    //   })
    // }).then(response => {
    //   if (response.status === 401) {
    //     throw new Error("Token 인증에 실패하였습니다.")
    //   } else if (response.status === 403) {
    //     throw new Error("접근 범위가 아닙니다.")
    //   } else if (response.status === 500) {
    //     throw new Error("서버 관리자에게 문의 해주세요")
    //   }
    //   return response.json()
    // }).then(updateTodo => {
    //   dispatch(updateTodoActionCreator(updateTodo))
    // }).catch(error => {
    //   console.log(error.toLocaleString())
    // })
    // setUpdate(prevState => {
    //   return {
    //     ...prevState,
    //     state: false
    //   }
    // })
    fetchPutTodo(setUpdate, accesstoken, todoInput, authInfo, dispatch, event,
        index, updateState)
  }

  function printCompleteTime(time) {
    return new Date(time).toLocaleString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
      // todo title 및 날짜
      <Grid2 lg={6} sx={{maxHeight: 500, minWidth: 550}}>
        <Paper variant={"elevation"} elevation={4}
               sx={{padding: 3, backgroundColor: "#F3EED9",}}>
          <Stack direction={"row"} justifyContent={"space-between"}
                 alignItems={"center"}>
            <Typography variant={"h5"} fontWeight={700}
                        sx={{fontFamily: "Oswald"}}>
              TaskPro</Typography>
            <Typography sx={{fontFamily: "Oswald"}} variant={"subtitle2"}
                        fontWeight={600}>{new Date().toLocaleDateString()}</Typography>
          </Stack>
          <Stack direction={"row"} flexGrow={1} justifyContent={"end"}
                 spacing={2}>
            <Typography color={"mediumvioletred"} variant={"subtitle2"}>Rest
              : {todo.result.rest}</Typography>
            <Typography color={"green"} variant={"subtitle2"}>Clear
              : {todo.result.clear}</Typography>
          </Stack>
          <Divider sx={{marginTop: 1, backgroundColor: "black",}}/>


          {/*over flowY시 박스 사이즈 초과해도 mxaHeight안에서 스크롤 바가 생긴다*/}
          {/*todo 항목*/}
          <Stack flexGrow={1} minHeight={320} maxHeight={320}
                 sx={{marginTop: 2, marginBottom: 2, overflowY: "auto"}}>
            {todo.list.map((todo) => {
              // console.log(todo)
              return (
                  <Paper variant={"outlined"} elevation={4} sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1
                  }}>
                    {/* 체크박스 이벤트 */}
                    {/* 체크시 onchang기능 잠금 */}
                    {todo.complete === false ? <Checkbox defaultChecked
                                                         color="error"
                                                         icon={
                                                           <FavoriteBorder/>}
                                                         checkedIcon={
                                                           <Favorite/>}
                                                         checked={todo.complete}
                                                         onChange={(event) => {
                                                           todoComplete(event,
                                                               todo.taskId)
                                                         }}/>
                        :
                        <Checkbox defaultChecked color="error"
                                  icon={<Favorite/>}
                                  checkedIcon={<Favorite/>}
                                  checked={todo.complete}
                        />
                    }
                    {/* 투두 항목 */}
                    {
                      <Stack
                          direction={"row"}
                          alignItems={"center"}
                      >
                        {
                          updateState.state && updateState.index === todo.taskId
                              ?
                              <Input
                                  value={updateState.task}
                                  onChange={editUpdate}
                                  placeholder={"수정할 내용을 입력해주세요."}
                                  sx={{minWidth: 300}}/>
                              :
                              <>
                                <Typography

                                    minWidth={270}
                                    sx={todo.complete
                                        && {textDecoration: "line-through"}}
                                >

                                  {todo.task}
                                </Typography>
                              </>
                        }
                        {
                            todo.complete &&
                            <Stack direction={"row"}>
                              <Typography>
                                {printCompleteTime(todo.completeTime)}
                              </Typography>
                              <Stack marginLeft={2}>
                                <AlarmOn fontSize={"medium"} color={"success"}/>
                              </Stack>
                            </Stack>
                        }
                        <Stack direction={"row"} spacing={3}
                               sx={{size: "small"}}>
                          {
                              (todo.complete === false)
                              && (updateState.state === false) &&
                              <>
                                <IconButton variant={"contained"}
                                            color={"warning"}
                                            sx={{marginLeft: 4}}
                                            onClick={(event) => {
                                              updateBtnEvent(event, todo.taskId)
                                            }
                                            }
                                ><AutoFixHighIcon/></IconButton>
                                <IconButton color={"error"}
                                            variant={"contained"}
                                            onClick={(event) => {
                                              deleteEvent(event, todo.taskId)
                                            }
                                            }><CancelIcon/></IconButton>
                              </>
                          }
                          {
                              updateState.state && updateState.index
                              === todo.taskId &&
                              <Button variant={"contained"}
                                      onClick={(event) => {
                                        updateContentBtn(event, todo.taskId)
                                      }}
                              >완료</Button>
                          }
                        </Stack>

                      </Stack>
                    }
                  </Paper>
              )

            })}

          </Stack>

          <Stack direction={"row"} alignItems={"center"} sx={{
            backgroundColor: "#666666",
            borderRadius: 10,
            padding: '3px 20px'
          }}>
            {/*flexGrow 사용시 남은 여백만큼 위치 차지함*/}
            <Input placeholder={"New Task..."}
                   sx={{flexGrow: 1, color: "white", fontFamily: "Oswald"}}
                // value={inputState.todoInput}
                   onKeyDown={addTodoEventHandler}
                   inputRef={todoInput}
            />
            <IconButton onClick={addTodoEventHandler}>
              <TaskAltIcon sx={{color: "white"}} fontSize={"medium"}/>
            </IconButton>
          </Stack>
        </Paper>
        {/*<Snackbar*/}
        {/*    open={todo.open}*/}
        {/*    autoHideDuration={3000}*/}
        {/*    onClose={handleClose}*/}
        {/*    message="You are so Nice!"*/}
        {/*/>*/}
      </Grid2>
  )
}