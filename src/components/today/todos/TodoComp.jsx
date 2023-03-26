import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  Input,
  Paper,
  Snackbar,
  Stack,
  Typography
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {useEffect, useRef, useState} from "react";
import {AlarmOn, Favorite, FavoriteBorder} from "@mui/icons-material";
import {
  addTodoActionCreator,
  completeTodoActionCreator,
  deleteTodoActionCreator,
  getAllTodoActionCreator,
  updateTodoActionCreator
} from "../../../redux/actions/todoAction";
import {useDispatch, useSelector} from "react-redux";
import {myRequestGenerator} from "../../../helper/helper";
import CancelIcon from '@mui/icons-material/Cancel';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
export default function TodoComp() {

  const [updateState, setUpdate] = useState({
    task: '',
    state: false
  })

  const todo = useSelector(state => state.todo)
  const dispatch = useDispatch()

  const [state, setState] = useState()

  // 인풋을 따로 관리 하지않으면 useEffect 의미가없다 계속 내부 값이 변경되기때문에
  const [inputState, setInputState] = useState({
    todoInput: ''
  })

  const todoInput = useRef()

  // 수정전
  // useEffect(() => {
  //   // result state설정
  //   fetch(myRequestGenerator("/schedules"))
  //   .then(response => response.json())
  //   .then(todos => {
  //     dispatch(getAllTodoActionCreator(todos))
  //     let completeCount = 0, restCount = 0
  //     for (const todo of todos) {
  //       todo.checkbox_complete? completeCount++ : restCount++
  //     }
  //     console.log("Complete: " + completeCount +", Rest: " + restCount)
  //   })
  //   .catch(error => console.log(error))
  // }, [])



  // 버튼 클릭시 todoList배열에 새로운 input 값을 추가
  const buttonClickEvent = (event, index) => {
    if (todoInput.current.value == 0) {
      alert("Todo를 입력해주세요")
      return
    } else if (todoInput.current.value.length != 0) {
      todoUpdateAPI()
    }
  }
  const todoUpdateAPI = () => {
    fetch(myRequestGenerator("/schedules"), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        todo_task: todoInput.current.value,
        checkbox_complete: false,
        user_id: 2,
        date: new Date().toISOString().split("T")[0]
      })
    }).then(response => response.json())
    .then(newTodo => {
      console.log(newTodo)
      dispatch(addTodoActionCreator(newTodo))
      todoInput.current.value = ""
    })
  }

  // 체크박스 이벤트 3
  const todoComplete = (event, index) => {
    dispatch(completeTodoActionCreator(index))
    fetch(myRequestGenerator(`/schedules/checkbox/${index}`), {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        task_id: index,
        user_id:2,
        date: new Date().toISOString().split("T")[0],
        checkbox_complete: event.target.checked,
        complete_time: Date.now().toString()
      })
    }).catch(error => {
      console.log(error)
      dispatch(completeTodoActionCreator(index))
      alert("서버 오류가 있습니다.")
    })
  }

  const enterEventHandler = (e) => {
    if (e.key === 'Enter' && todoInput.current.value.length != 0) {
      todoUpdateAPI()
    } else if (e.key === 'Enter') {
      alert("Todo를 입력해주세요")
    }
  }

// 삭제버튼 이벤트
  const deleteEvent = (event, index) => {
    fetch(myRequestGenerator(`/schedules/${index}`), {
      method: "DELETE"
    }).then(response => {
      dispatch(deleteTodoActionCreator(index))
    }).catch(error => console.log(error))
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
        state: updateItem,
        index: index,
        // 배열을 반환시 필터
        task: todoList.task
      }
    })
  }

// 업데이트 value저장
  const editUpdate = (e) => {
    console.log(e.target.value)
    setUpdate(prevState => {
      return {
        ...prevState,
        task: e.target.value
      }
    })
  }
  const updateContentBtn = (event, index) => {
    fetch(myRequestGenerator("/schedules"), {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: 2,
        task_id: index,
        todo_task: updateState.task
      })
    }).then(response => response.json())
    .then(updateTodo => {
      dispatch(updateTodoActionCreator(updateTodo))
      console.log(updateTodo)
    })
    setUpdate(prevState => {
      return {
        ...prevState,
        state: false
      }
    })
  }

// 스테이크 바 이벤트
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setState(prevState => {
      return {
        ...prevState,
        open: false
      }
    });
  };

  function printCompleteTime(time) {
    return new Date(time).toLocaleString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
      // todo title 및 날짜
      <Grid2 lg={6} sx={{maxHeight: 500, minWidth: 550}}>
        <Paper variant={"elevation"} elevation={4} sx={{padding: 3}}>
          <Stack direction={"row"} justifyContent={"space-between"}
                 alignItems={"center"}>
            <Typography variant={"h6"} fontWeight={700}>
              List</Typography>
            <Typography variant={"subtitle2"}
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
              return (
                  <Paper variant={"outlined"} elevation={4} sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1
                  }}>
                    {/* 체크박스 이벤트 */}
                    <Checkbox defaultChecked color="error"
                              icon={<FavoriteBorder/>}
                              checkedIcon={<Favorite/>}
                              checked={todo.complete}
                              onChange={(event) => {
                                todoComplete(event, todo.taskId)
                              }}
                    />
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
                                            sx={{marginLeft:4}}
                                        onClick={(event) => {
                                          updateBtnEvent(event, todo.taskId)
                                        }
                                        }
                                ><AutoFixHighIcon/></IconButton>
                                <IconButton color={"error"} variant={"contained"}
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
                   sx={{flexGrow: 1, color: "white"}}
                // value={inputState.todoInput}
                   onKeyDown={enterEventHandler}
                   inputRef={todoInput}
            />
            <IconButton onClick={buttonClickEvent}>
              <TaskAltIcon sx={{color: "white"}} fontSize={"medium"}/>
            </IconButton>
          </Stack>
        </Paper>
        {/* todo 달성시 하단 문구 창 */}
        <Snackbar
            open={todo.open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="You are so Nice!"
        />
      </Grid2>
  )
}