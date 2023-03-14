import Grid2 from "@mui/material/Unstable_Grid2";
import {Button, Stack, TextField, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import {useCallback, useRef, useState} from "react";
import {pomodoroJsonSample} from "./pomodoroJsonSample";

export default function PomodoroExample() {

  // 초기값을 undifined 상태로 만들어 초기화 한다
  const timerReference = useRef(undefined)
let count = 0
  const startTimer = useCallback(() => {
    console.log("시작 타이머")
    timerReference.current = setInterval(()=>{
      setState(prevState => {
        if (prevState.timer.count === 0){
          clearInterval(timerReference.current)
          timerReference.current = null
          return {
            ...prevState,
            timer: {
              ...prevState.timer,
              count :count
            }
          }
        }
        return {
          ...prevState,
          timer: {
            ...prevState.timer,
            count : prevState.timer.count -1
          }
        }
      })
    },100)
  },[])

  const setMinute = (event) => {
    setState(prevState => {
      return {
        ...prevState,
        input: {
          ...prevState.input,
          minute: parseInt(event.target.value)
        },
        timer: {
          ...prevState.timer,
          count: parseInt(event.target.value) * 60
        }
      }
    })
  }

  const pauseTimer = () => {
    console.log("pause 버튼")
    if (timerReference.current){
      clearInterval(timerReference.current)
      timerReference.current = null
    }else{
      return
    }
  }

  const resetTimer = () => {
    console.log("리셋버튼")
    clearInterval(timerReference.current)
    timerReference.current = null
    setState(prevState => {
      return {
        ...prevState,
        timer: {
          ...prevState.timer,
          count: prevState.input.minute * 60
        }
      }
    })
  }

  const setRestTime = (event) => {
    setState(prevState => {
      return {
        ...prevState,
        input: {
          ...prevState.input,
          rest : parseInt(event.target.value)
        },
        timer: {
          ...prevState.timer,
          count: parseInt(event.target.value) * 60
        }
      }
    })
  }



  const [state, setState] = useState(pomodoroJsonSample)

  return (
      <Grid2 marginTop={30}>
        <Divider/>
        <Stack>
          <Typography variant={"h1"}>{state.timer.count}</Typography>
          {/* 리셋버튼 */}
          <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                  color={"error"}
                  onClick={resetTimer}
          >리셋</Button>
          {/* 일시정지 */}
          <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                  color={"warning"}
                  onClick={pauseTimer}
          >일시정지</Button>
          {/* 시작버튼 */}
          <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                  color={"success"}
                  onClick={startTimer}
          >시작</Button>
        </Stack>


        <Stack direction={"row"}>
          <TextField type={"number"} placeholder={"시작값"} onChange={setMinute}/>
          <TextField type={"number"} placeholder={"휴식시간"} onChange={setRestTime}/>
        </Stack>
      </Grid2>
  )
}