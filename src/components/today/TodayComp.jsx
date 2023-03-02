import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Checkbox,
  Container,
  Divider,
  IconButton,
  Input,
  Paper,
  Snackbar,
  Stack,
  Typography
} from "@mui/material";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {useState} from "react";
import {Today} from "@mui/icons-material";
import TodayTemplate from "./components/TodayTemplate";
import TodayCompCopy from "./TodayCompCopy";
import TodayCompCopy2 from "./TodayCompCopy2";

const localStorage = window.localStorage;

export default function TodayComp() {

  const [state, setState] = useState({
    open: false,
    todoInput: '',
    todoList: [
      {
        task: 1,
        complete: false,
        completeTime: ''
      },
      {
        task: 2,
        complete: false
      },
      {
        task: 3,
        complete: false
      },
      {
        task: 4,
        complete: false
      }
    ]
  })

  // 투두리스트 버튼 이벤트
  const buttonEvent = () => {
    if (state.todoInput.length == 0) {
      alert("항목을 입력해주세요")
      return
    }
    setState(prevState => {
      const todoList = state.todoList
      todoList.push({
        task: state.todoInput,
        complete: false
      })
      return {
        ...prevState,
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
        todoList: todoList
      }
    })
  }

  // input 이벤트
  const todoInputHandler = (e) => {
    setState(prevState => {
      return {
        ...prevState,
        todoInput: e.target.value
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

      <Container fixed={"true"}>
        <Grid2 container={"true"} lg={12} spacing={2}>
          {/*<Grid2 lg={12}>*/}
          {/*  <Paper variant={3}>*/}
          {/*    상단 Grid*/}
          {/*    <RepositoriesComp/>*/}
          {/*  </Paper>*/}
          {/*</Grid2>*/}
        </Grid2>

        <Grid2 container="true" spacing={2}>
          <Grid2 lg={6} sx={{maxHeight: 500}}>
            <Paper variant={"elevation"} elevation={4} sx={{
              padding: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}>
              <Typography variant={"h6"} fontWeight={700}>Todo List</Typography>
              <Typography
                  variant={"subtitle2"}>{new Date().toLocaleDateString()}</Typography>
              <Divider sx={{marginTop: 1, backgroundColor: '#333'}}/>
              <Stack marginTop={3} marginBottom={3} flexGrow={1}
                     sx={{overflowY: "auto"}} spacing={2}>
                {
                  state.todoList.map((todo, index) => {
                    return (
                        <Paper variant={"outlined"} elevation={1} sx={{
                          padding: "10px 20px",
                          display: "flex",
                          alignItems: "center"
                        }}>
                          <Checkbox checked={todo.complete} onChange={(e) => {
                            todoComplete(e, index)
                          }} defaultChecked color="secondary"/>
                          {
                            todo.complete ? <Typography
                                    sx={{textDecoration: "line-through"}}>{todo.task} {todo.completeTime}</Typography>
                                :
                                <Typography>{todo.task}</Typography>
                          }
                        </Paper>
                    )
                  })
                }
              </Stack>
              <Snackbar
                  open={state.open}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  message="You are so Nice!"
              />
              <Stack direction={"row"} alignItems={"center"} sx={{
                backgroundColor: "#4E545C",
                padding: '3px 20px',
                borderRadius: 5
              }}>
                <Input value={state.todoInput} onChange={todoInputHandler}
                       placeholder="New Task..."
                       sx={{flexGrow: 1, color: '#fff'}}/>
                <IconButton onClick={buttonEvent}>
                  <PlaylistAddIcon fontSize={"medium"} sx={{color: "#fff"}}/>
                </IconButton>
              </Stack>
            </Paper>
          </Grid2>
          <TodayTemplate/>
        </Grid2>
      </Container>
  )
}

