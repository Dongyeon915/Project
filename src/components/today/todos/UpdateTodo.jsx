import {Button, Input, Paper, Stack} from "@mui/material";

export default function UpdateTodo() {
  return (
      <Stack direction={"row"} alignItems={"center"}
             justifyContent={"space-between"}
             position={"absolute"}
             zIndex={1000}
      >
        <Paper sx={{
          minWidth: 400,
          position: "absolute"
        }}>
          <Stack direction={"row"} padding={1}
                 spacing={2}>
            <Input placeholder={"수정할 내용을 입력해주세요."}
                   sx={{minWidth: 300}}/>
            <Button variant={"contained"}>완료</Button>
          </Stack>
        </Paper>
      </Stack>
  )
}