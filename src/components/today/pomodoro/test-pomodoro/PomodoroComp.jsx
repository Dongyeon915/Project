import Grid2 from "@mui/material/Unstable_Grid2";
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import NotStartedIcon from '@mui/icons-material/NotStartedOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {useCallback, useRef, useState} from "react";
import {store} from "../../../../redux/store";
import {
  pauseTimerActionCreator, resetTimerActionCreator, startTimerActionCreator
} from "../../../../redux/actions/pomodoroAction";

export default function PomodoroCopy() {
  // JavaScript =>  false, null, undefined, 0, ''
  // null 은 초기값이 없기 때문에 false
  // undefined 은 아무것도 없는 상태
  const timerReference = useRef(undefined)

  const [pomodoroState, pomodoroSetState] = useState(store.getState())

  // onChange시 저장하

  function calcTime(epocTime) {
    const hour = parseInt(epocTime / (60 * 60))
    epocTime = epocTime - (hour * 60 * 60)
    const minute = parseInt(epocTime / 60)
    const second = epocTime % 60
    return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
  }

  function startButtonTitle() {
    if(pomodoroState.pomo.pomodoro.timer.state.isPause) {
      return "Re-Start"
    }
    return "Start"
    return pomodoroState.pomo.pomodoro.timer.state.isPause? "Re-Start" : "Start"
  }

  // 시간 설정
  // ref state로 시간을 멈출수 없고 start버튼 누를시 여러개가 실행될수 있고 ref로 만들시 clearInterval관리와 참조해서 다른곳에서 사용할수있다.
  const startTimer = useCallback(() => {
    if (timerReference.current) {
      console.log("Timer Already Exist!")
      return;
    }
    timerReference.current = setInterval(() => {
      store.dispatch(startTimerActionCreator(timerReference))
      clearInterval(timerReference.current)
      timerReference.current = null
    }, 1000)
  }, [])

  // 정지 이벤트
  const pauseTimer = useCallback(() => {
    store.dispatch(pauseTimerActionCreator(timerReference))
    clearInterval(timerReference.current)
    timerReference.current = null
  }, []);


  // reset 이벤트
  const resetTimer = () => {
    clearInterval(timerReference.current)
    timerReference.current = null
    store.dispatch(resetTimerActionCreator(timerReference))
    alert("타이머 시간을 초기화 했습니다.^^")
    console.log("reset 버튼 작동")
  };

  // text file 분을 state set
  const setFocuseTime = (event) => {
    pomodoroSetState(prevState => {
      console.log(prevState)
      return {
        ...prevState,
        config: {
          ...prevState.pomo.pomodoro.config,
          // 문자열로 인식할수 있으므로 parseInt로 value설정
          minute: parseInt(event.target.value),
          countValue: parseInt(event.target.value) * 60
        }
      }
    })
  }


  //  휴식 시간 설정
  const setRestTime = (event) => {
    pomodoroSetState(prevState => {
      return {
        ...prevState,
        config: {
          ...prevState.pomo.pomodoro.config,
          rest: parseInt(event.target.value),
          countValue: parseInt(event.target.value) * 60
        }
      }
    })
  }

  console.log(pomodoroState.pomo.pomodoro.config.minute)
  return (
      <Grid2 container={"true"} direction={"column"} minHeight={500}>
        <Grid2 sm={12}>
          <Paper variant="elevation" elevation={"4"} sx={{borderRadius: 50,backgroundColor:"#ee5d50"}}>
            {/* 상단 시간 영역*/}
            <Stack alignItems={"center"} padding={3}>
              <Typography color={"white"} fontWeight={"bolder"} flexGrow={1}
                          variant={"h1"}>
                {pomodoroState.pomo.pomodoro.config.countValue ? calcTime(pomodoroState.pomo.pomodoro.config.countValue)
                    : 0}
              </Typography>
            </Stack>
            <Divider variant={"middle"}/>

            {/* 하단 버튼 영역*/}
            <Stack direction={"row"} spacing={3} padding={2}
                   justifyContent={"center"}>
              {/* 일시정지 버튼 */}
              {
                  pomodoroState.pomo.pomodoro.timer.state.isRunning
                  &&
                  <Button sx={{padding: 1}}
                          variant={"contained"}
                          size={"large"}
                          color={"warning"}
                          onClick={pauseTimer}>
                    <NotStartedIcon sx={{marginRight: 1}}/>
                    Pause
                  </Button>
              }

              {/* start 버튼 */}
              {
                  pomodoroState.pomo.pomodoro.timer.state.isRunning
                  ||
                  <Button sx={{padding: 1}}
                          variant={"contained"} size={"large"}
                          color={"success"}
                          onClick={startTimer}>
                    <PlayCircleOutlineIcon sx={{marginRight: 1}}/>
                    {startButtonTitle()}
                  </Button>
              }
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
        <Grid2 sm={12} marginTop={6}>
          <Paper>
            <Typography marginLeft={5} variant={"h2"} flexGrow={1}
                        color={"#ee5d50"} fontWeight={"bolder"}>
              Pomodoro Timer
            </Typography>
            <Divider variant={"middle"}/>


            {/*분단위을 설정하는 부분*/}
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant={"h5"} flexGrow={1} marginLeft={5}>
                Select Minute
              </Typography>
              {/* onChang시 (event를 넣지않아도 해당 이벤트의 event 정보가 넘어가므로 index시에만 전달하기) */}
              <TextField sx={{minWidth: 200, marginRight: 10}}
                         label="Value 0 ~ 59"
                         onChange={setFocuseTime}
                         type={"number"}
                         value={pomodoroState.pomo.pomodoro.config.minute}
                         inputProps={{
                           inputMode: 'numeric',
                           pattern: '[0-9]{2}'
                         }}
                         disabled={pomodoroState.pomo.pomodoro.timer.state.isRunning}
              >
              </TextField>
            </Stack>
            <Divider variant={"middle"}/>

            {/*초단위 설정 화면*/}

            <Stack direction={"row"} alignItems={"center"} padding={1}>
              <Typography variant={"h5"} flexGrow={1} marginLeft={5}>
                Select  Rest
              </Typography>
              <TextField sx={{minWidth: 200, marginRight: 9}}
                         label="Value 0 ~ 59"
                         onChange={setRestTime}
                         type={"number"}
                         inputProps={{
                           inputMode: 'numeric',
                           pattern: '[0-9]{2}'
                         }}
                         value={pomodoroState.pomo.pomodoro.config.rest}
                         disabled={pomodoroState.pomo.pomodoro.timer.state.isRunning}
              >
              </TextField>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
  )
}