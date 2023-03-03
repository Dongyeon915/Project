import Grid2 from "@mui/material/Unstable_Grid2";
import {Container} from "@mui/material";
import {useState} from "react";
import TaskComp from "./TaskComp";

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
        <Grid2 container="true" spacing={2} sm={12}>
          <TaskComp/>
        </Grid2>
      </Container>
  )
}

