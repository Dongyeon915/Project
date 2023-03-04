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
import {useState} from "react";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import UpdateComp from "./UpdateComp";

export default function TaskComp() {

  const [updateState,setUpdate] = useState({
    upDateValue : false
  })

  const [state, setState] = useState({
    todoInput: "",
    clearTask: 0,
    restTask: 0,
    todoList: [
      // {
      //   id: 20,
      //   task: "씻기",
      //   complete: false,
      //   completeTime: ''
      // }
    ]
  })

  // const [clearState,setClear] = useState({
  //   clearList : []
  // })

  // 버튼 클릭시 todoList배열에 새로운 input 값을 추가
  const buttontCopyEvent = (event, index) => {
    if (state.todoInput.length == 0) {
      alert("Todo를 입력해주세요")
      return
    }
    setState(prevState => {
      const todoList = state.todoList
      todoList.push({
        id: Date.now().toString(),
        task: state.todoInput,
        // 체크박스 이벤트를위한 값설정
        complete: false
      })
      return {
        ...prevState,
        restTask : state.restTask + 1,
        todoList: todoList
      }
    })
  }

  // 체크박스 이벤트
  const todoComplete = (event, index) => {
    const date = new Date()
    const todoList = state.todoList;
    todoList[index].complete = event.target.checked
    todoList[index].completeTime = date.toLocaleTimeString()
    setState(prevState => {
      return {
        ...prevState,
        open: event.target.checked,
        todoList: todoList,
      }
    })
  }



  //  inputBox 내용을 현재 e타겟 value로 setState저장
  const todoCopyInputHandler = (e) => {
    setState(prevState => {
      return {
        ...prevState,
        todoInput: e.target.value
      }
    })
  }

  // 삭제버튼 이벤트
  const deleteEvent = (event, index) => {
    // event를 todoItem으로 읽기 좋게 변경 사용
    const todoList = state.todoList.filter(todoItem => {
      if (todoItem.id !== state.todoList[index].id) {
        return todoItem
      }
    })
    setState(prevState => {
      return {
        ...prevState,
        todoList: todoList,
        restTask: state.restTask -1
      }
    })
  }
  // 완료 이벤트
  const clearEvent = (event, index) => {
    console.log(index)
    const clearList = state.todoList.filter(clearItem => {
      if (clearItem.id !== state.todoList[index].id) {
        return clearItem
      }
    })
    setState(prevState => {
      return {
        ...prevState,
        restTask: state.restTask - 1,
        clearTask: state.clearTask + 1,
        todoList: clearList
      }
    })
  }

  // 업데이트 이벤트
  // const updateBtnEvent = (event,index) => {
  //   console.log(index)
  //   const updateItem = updateState
  //   updateItem[index].upDateValue = event.target.upDateValue
  //   setUpdate(prevState => {
  //       return {
  //         upDateValue : updateItem
  //       }
  //   })
  // }

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
        <Paper variant={"elevation"} elevation={4} sx={{padding: 3,}}>
          <Stack direction={"row"} justifyContent={"space-between"}
                 alignItems={"center"}>
            <Typography variant={"h6"} fontWeight={700}>Todo
              List</Typography>
            <Typography variant={"subtitle2"}
                        fontWeight={600}>{new Date().toLocaleDateString()}</Typography>
          </Stack>
          <Stack direction={"row"} flexGrow={1} justifyContent={"end"} spacing={2}>
            <Typography color={"mediumvioletred"} variant={"subtitle2"}>Rest : {state.restTask}</Typography>
            <Typography color={"green"} variant={"subtitle2"}>Clear : {state.clearTask}</Typography>
          </Stack>
          <Divider sx={{marginTop: 1, backgroundColor: "black",}}/>


          {/*over flowY시 박스 사이즈 초과해도 mxaHeight안에서 스크롤 바가 생긴다*/}
          {/*todo 항목*/}
          <Stack flexGrow={1} minHeight={320} maxHeight={320}
                 sx={{marginTop: 2, marginBottom: 2, overflowY: "auto"}}>
            {state.todoList.map((todo, index) => {
              return (
                  <Paper variant={"outlined"} elevation={"4"} sx={{
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
                                todoComplete(event, index)
                              }}
                    />

                    {/* 투두 항목 */}
                    {
                      todo.complete ?
                          <Grid2 direction={"row"}>
                            <Stack direction={"row"} spacing={18}
                                   sx={{size: "smoll"}}
                                   alignItems={"center"}
                            >
                              <Typography
                                  sx={{textDecoration: "line-through"}}>{todo.task}</Typography>
                              <Stack direction={"row"} flexGrow={1}>
                                <Stack direction={"row"} alignItems={"center"}
                                       spacing={5}>
                                  <Typography>
                                    {todo.completeTime}
                                  </Typography>
                                  <Button color={"success"}
                                          variant={"contained"}
                                          onClick={(event) => {
                                            clearEvent(event, index)
                                          }
                                          }>완료</Button>
                                </Stack>
                              </Stack>
                            </Stack>
                          </Grid2>
                          :
                          <Stack direction={"row"} alignItems={"center"}
                                 justifyContent={"space-between"} flexGrow={1}>
                            <Typography>{todo.task}</Typography>

                            {/*수정버튼이 true시 나오게 하기*/}
                            {updateState.upDateValue &&
                                <Stack direction={"row"} alignItems={"center"}
                                       justifyContent={"space-between"} flexGrow={1}
                                       position={"absolute"}
                                       zIndex={1000}
                                >
                                  <Paper sx={{minWidth:400,position : "absolute"}} >
                                    <Typography variant={"h5"} flexGrow={1}>
                                      Edit
                                    </Typography>
                                    <Divider/>
                                    <Input placeholder={"수정할 내용을 입력해주세요."} sx={{minWidth:400}}/>
                                  </Paper>
                                </Stack>
                            }
                            <Stack direction={"row"} spacing={1}
                                   sx={{size: "smoll"}}>
                              <Button variant={"contained"}
                                      // onClick={(event) => {
                                      //   updateBtnEvent(event,index)
                                      // }
                                      // }
                              >수정</Button>
                              <Button color={"error"} variant={"contained"}
                                      onClick={(event) => {
                                        deleteEvent(event, index)
                                      }
                                      }>삭제</Button>
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
                   onChange={todoCopyInputHandler}
            />









            <IconButton onKeyDown={(e) => buttontCopyEvent} onClick={buttontCopyEvent}>
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