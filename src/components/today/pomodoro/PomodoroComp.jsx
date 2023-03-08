import Grid2 from "@mui/material/Unstable_Grid2";
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {useEffect, useState} from "react";

export default function PomodoroComp() {

  // function calcTime(time) {
  //   const hour = parseInt(time / ( 60 * 60));
  //   time -= (60 * 60) * hour
  //   const minute = parseInt(time / 60);
  //   const second = time % 60
  //   if (hour == 0)
  //     return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
  //   return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
  // }

  const [timeState, setTime] = useState({
    // minute : timeState.minute ? parseInt(timeState.minute) : 0,
    minute: '00',
    second: '00'
  })

  // 시간 설정
  const startTimer = () => {
    console.log("start 버튼 작동")
  };

  // 정지 이벤트
  const pauseTimer = () => {
    console.log("pause 버튼 작동")
  };

  // reset 이벤트
  const resetTimer = () => {
    console.log("reset 버튼 작동")
  };

  // text file 분을 state set
  const setMinut = (evnet) => {
    setTime(prevState => {
      return {
        ...prevState,
        minute: evnet.target.value
      }
    })
  }
  //  초 설정
  const setSecond = (evnet) => {
    setTime(prevState => {
      return {
        ...prevState,
        second: evnet.target.value
      }
    })
  }

  // setInterval 주어진 함수를 주어진 시간마다 실행
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevState => {
        return {
          ...prevState,
          second: timeState.second - 1
        }
      })
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [timeState]);

  return (
      <Grid2 container={"true"}>
        <Grid2 sm={6}>
          <Paper variant={"elevation"} elevation={4} sx={{borderRadius: 20}}>

            {/* 상단 시간 영역*/}
            <Stack marginLeft={4} padding={2}>
              <Typography color={"orangered"} fontWeight={"bolder"} flexGrow={1}
                          variant={"h1"}>{timeState.minute} 분 {timeState.second} 초</Typography>
            </Stack>
            <Divider variant={"middle"}/>

            {/* 하단 버튼 영역*/}
            <Stack direction={"row"} spacing={3} padding={2}
                   justifyContent={"center"}>
              {/* 일시정지 버튼 */}
              <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                      color={"warning"}
                      onClick={pauseTimer}
              >
                <NotStartedIcon sx={{marginRight: 1}}/>Pause</Button>
              {/* start 버튼 */}
              <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                      color={"success"}
                      onClick={startTimer}
              >
                <PlayCircleOutlineIcon sx={{marginRight: 1}}/>Start</Button>
              {/* reset 버튼 */}
              <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                      color={"error"}
                      onClick={resetTimer}
              >
                <RestartAltIcon sx={{marginRight: 1}}/>Reset</Button>
            </Stack>
          </Paper>
        </Grid2>


        {/*타이머 설정창*/}
        <Grid2 sm={6}>
          <Paper>
            <Typography variant={"h3"} flexGrow={1} marginLeft={10}
                        color={"orangered"} fontWeight={"bolder"}>
              Pomodoro Timer
            </Typography>
            <Divider variant={"middle"}/>

            {/*분단위을 설정하는 부분*/}
            <Stack direction={"row"} alignItems={"center"} padding={1}>
              <Typography variant={"h5"} flexGrow={1} marginLeft={5}>
                Select Minute
              </Typography>
              <TextField sx={{minWidth: 200, marginRight: 10}}
                         id="outlined-select-currency"
                         label="Value 0 ~ 60"
                         onChange={event => {
                           setMinut(event)
                         }}

              >

              </TextField>
            </Stack>
            <Divider variant={"middle"}/>

            {/*초단위 설정 화면*/}
            <Stack direction={"row"} alignItems={"center"} padding={1}>
              <Typography variant={"h5"} flexGrow={1} marginLeft={5}>
                Select Second
              </Typography>
              <TextField sx={{minWidth: 200, marginRight: 10}}
                         id="outlined-select-currency"
                         label="Value 0 ~ 60"
                         onChange={event => {
                           setSecond(event)
                         }}
              >
              </TextField>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
  )
}