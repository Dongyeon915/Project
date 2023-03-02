import {IconButton, Input, Stack} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function TodoInput() {
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