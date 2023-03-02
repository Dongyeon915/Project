import {IconButton, Input, Stack} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {useReducer} from "react";
import {todoInfo} from "./todoInfo";

export default function TodoInput() {

  const reducer = (state,action) => {};

  const initialState = {
    todoList: [
      {
        id: 1,
        task: "씻기",
        complete: false,
        completeTime: ''
      },
      {
        id: 2,
        task: "밥먹기",
        complete: false,
        completeTime: ''
      }
    ]
  }

  const[todoList, dispatch] = useReducer(reducer,initialState);


  return (
      <Stack direction={"row"} alignItems={"center"} sx={{
        backgroundColor: "#666666",
        borderRadius: 10,
        padding: '3px 20px'
      }}>
        {/*flexGrow 사용시 남은 여백만큼 위치 차지함*/}
        <Input placeholder={"New Task..."}
               sx={{flexGrow: 1, color: "white"}}
        />
        <IconButton>
          <TaskAltIcon sx={{color: "white"}} fontSize={"medium"}/>
        </IconButton>
      </Stack>
  )
}