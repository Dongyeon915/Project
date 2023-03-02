import {todoInfo} from "./todoInfo";
import {useState} from "react";
import {Button, Checkbox, Paper, Stack, Typography} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";

export default function TodoItem(){
  const [todo, setTodo] = useState({todoInfo})

  return (

        <Stack flexGrow={1} minHeight={320} maxHeight={320}
               sx={{marginTop: 2, marginBottom: 2, overflowY: "auto"}}>
        {todo.todoInfo.todayList.map((todo) => {
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
                          checked={todo.complete}/>
                {/* 투두 항목 */}
                <Stack direction={"row"} alignItems={"center"}
                       justifyContent={"space-between"} flexGrow={1}>
                  <Typography>{todo.task}</Typography>
                  <Stack direction={"row"} spacing={1}
                         sx={{size: "smoll"}}>
                    <Button variant={"contained"}>수정</Button>
                    <Button color={"error"} variant={"contained"}
                          >삭제</Button>
                  </Stack>
                </Stack>
              </Paper>
          )
        })
        }
        </Stack>
  )
}