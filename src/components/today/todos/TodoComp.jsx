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
import {useCallback, useEffect, useMemo, useState} from "react";
import {Favorite, FavoriteBorder, GitHub,AlarmOn} from "@mui/icons-material";
import {reduxStore} from "../../../redux/store";
import {
  addTodoActionCreator,
  completeTodoActionCreator, deleteTodoActionCreator, updateTodoActionCreator
} from "../../../redux/actions/todoAction";
export default function TodoComp() {

  const [updateState, setUpdate] = useState({
    task: '',
    state: false
  })


  const [state, setState] = useState(reduxStore.getState())
  // 인풋을 따로 관리 하지않으면 useEffect 의미가없다 계속 내부 값이 변경되기때문에
  const [inputState, setInputState] = useState({
    todoInput: ''
  })

  useEffect(() => {
    const unSubscribe = reduxStore.subscribe(() => {
      console.log("Redux State Change!")
      setState(reduxStore.getState())
    })
    return () => {
      unSubscribe()
    }
  }, [])

  // 버튼 클릭시 todoList배열에 새로운 input 값을 추가
  const buttonClickEvent = (event, index) => {
    if (inputState.todoInput.length == 0) {
      alert("Todo를 입력해주세요")
      return
    }
    reduxStore.dispatch(addTodoActionCreator(inputState.todoInput))
    setInputState({todoInput: ''})
  }

  // 체크박스 이벤트
  const todoComplete = (event, index) => {
    reduxStore.dispatch(completeTodoActionCreator(index))
  }

  //  inputBox 내용을 현재 e타겟 value로 setState저장
  const todoCopyInputHandler = (e) => {
    setInputState(prevState => {
      return {
        ...prevState,
        todoInput: e.target.value
      }
    })
  }

  const enterEventHandler = (e) => {
    if (e.key === 'Enter' && inputState.todoInput.length != 0) {
      reduxStore.dispatch(addTodoActionCreator(inputState.todoInput))
      setInputState({todoInput: ''})
    } else if (e.key === 'Enter') {
      alert("Todo를 입력해주세요")
    }
  }

  // 삭제버튼 이벤트
  const deleteEvent = (event, index) => {
    reduxStore.dispatch(deleteTodoActionCreator(index))
  }

  // 업데이트 이벤트
  const updateBtnEvent = (event, index) => {
    const updateItem = true
    const todo =  state.todo.list.find(task => {
      if (task.taskId === index) return task
    })
    setUpdate(prevState => {
      return {
        state: updateItem,
        index: index,
        // 배열을 반환시 필터
        task: todo.task
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
    reduxStore.dispatch(updateTodoActionCreator(index, updateState.task))
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

  return (
      // todo title 및 날짜
      <Grid2 lg={6} sx={{maxHeight: 500, minWidth: 550}}>
        <Paper variant={"elevation"} elevation={4} sx={{padding: 3}}>
          <Stack direction={"row"} justifyContent={"space-between"}
                 alignItems={"center"}>
            <Typography variant={"h6"} fontWeight={700}>Todo
              List</Typography>
            <Typography variant={"subtitle2"}
                        fontWeight={600}>{new Date().toLocaleDateString()}</Typography>
          </Stack>
          <Stack direction={"row"} flexGrow={1} justifyContent={"end"}
                 spacing={2}>
            <Typography color={"mediumvioletred"} variant={"subtitle2"}>Rest
              : {state.todo.result.rest}</Typography>
            <Typography color={"green"} variant={"subtitle2"}>Clear
              : {state.todo.result.clear}</Typography>
          </Stack>
          <Divider sx={{marginTop: 1, backgroundColor: "black",}}/>


          {/*over flowY시 박스 사이즈 초과해도 mxaHeight안에서 스크롤 바가 생긴다*/}
          {/*todo 항목*/}
          <Stack flexGrow={1} minHeight={320} maxHeight={320}
                 sx={{marginTop: 2, marginBottom: 2, overflowY: "auto"}}>
            {state.todo.list.map((todo) => {
              return (
                  <Paper variant={"outlined"} elevation={4} sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1
                  }}>
                    {/* 체크박스 */}
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
                          updateState.state && updateState.index === todo.taskId ?
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
                                {todo.completeTime}
                              </Typography>
                              <Stack marginLeft={2}>
                                <AlarmOn fontSize={"medium"} color={"success"}/>
                              </Stack>
                            </Stack>
                        }
                        <Stack direction={"row"} spacing={1}
                               sx={{size: "small"}}>
                          {
                              (todo.complete === false)
                              && (updateState.state === false) &&
                              <>
                                <Button variant={"contained"}
                                        onClick={(event) => {
                                          updateBtnEvent(event, todo.taskId)
                                        }
                                        }
                                >수정</Button>
                                <Button color={"error"} variant={"contained"}
                                        onClick={(event) => {
                                          deleteEvent(event, todo.taskId)
                                        }
                                        }>삭제</Button>
                              </>
                          }
                          {
                              updateState.state && updateState.index === todo.taskId &&
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


          {/*todo input*/}
          <Stack direction={"row"} alignItems={"center"} sx={{
            backgroundColor: "#666666",
            borderRadius: 10,
            padding: '3px 20px'
          }}>
            {/*flexGrow 사용시 남은 여백만큼 위치 차지함*/}
            <Input placeholder={"New Task..."}
                   sx={{flexGrow: 1, color: "white"}}
                   value={inputState.todoInput}
                   onChange={todoCopyInputHandler}
                   onKeyDown={enterEventHandler}
            />
            <IconButton onClick={buttonClickEvent}>
              <TaskAltIcon sx={{color: "white"}} fontSize={"medium"}/>
            </IconButton>
          </Stack>
        </Paper>
        {/* todo 달성시 하단 문구 창 */}
        <Snackbar
            open={state.open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="You are so Nice!"
        />
      </Grid2>
  )
}