import Grid2 from "@mui/material/Unstable_Grid2";
import {Button, Stack, TextField, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import {useState} from "react";
import {pomodoroJsonSample} from "./pomodoroJsonSample";

export default function PomodoroExample() {

  const setMinute = (event) => {
    setState(prevState => {
      return {
        ...prevState,
        input: {
          ...prevState.input,
          minute: event.target.value
        }
      }
    })
  }

  const [state, setState] = useState(pomodoroJsonSample)

  return (
      <Grid2 marginTop={30}>
        <Divider/>
        <Stack>
          <Typography variant={"h1"}>{state.input.minute}</Typography>
          {/* 리셋버튼 */}
          <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                  color={"error"}>리셋</Button>
          {/* 일시정지 */}
          <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                  color={"warning"}>일시정지</Button>
          {/* 시작버튼 */}
          <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                  color={"success"}>시작</Button>
        </Stack>


        <Stack direction={"row"}>
          <TextField type={"number"} placeholder={"시작값"} onChange={setMinute}/>
          <TextField type={"number"} placeholder={"휴식시간"}/>
        </Stack>
      </Grid2>
  )
}