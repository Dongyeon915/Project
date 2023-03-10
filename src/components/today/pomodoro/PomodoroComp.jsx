import Grid2 from "@mui/material/Unstable_Grid2";
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import NotStartedIcon from '@mui/icons-material/NotStartedOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {useCallback, useRef, useState} from "react";
import {PomodoroSample} from "../../../sample/PomodoroSample";

export default function PomodoroComp() {
  // JavaScript =>  false, null, undefined, 0, ''
  // null 은 초기값이 없기 때문에 false
  // undefined 은 아무것도 없는 상태
  const timerReference = useRef(undefined)

  const [pomodoroState, pomodoroSetState] = useState(PomodoroSample)

  function calcTime(epocTime) {
    const hour = parseInt(epocTime / (60 * 60))
    epocTime = epocTime - (hour * 60 * 60)
    const minute = parseInt(epocTime / 60)
    const second = epocTime % 60
    return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
  }

  function startButtonTitle() {
    // if(pomodoroState.timer.isPause) {
    //   return "Re-Start"
    // }
    // return "Start"
    return pomodoroState.timer.isPause? "Re-Start" : "Start"
  }

  // 시간 설정
  // ref state로 시간을 멈출수 없고 start버튼 누를시 여러개가 실행될수 있고 ref로 만들시 clearInterval관리와 참조해서 다른곳에서 사용할수있다.
  const startTimer = useCallback(() => {
    if (timerReference.current) {
      console.log("Timer Already Exist!")
      return;
    }
    // --------------------------------------------------
    pomodoroSetState(prevState => {
      let pauseState, isRestState
      if (pomodoroState.timer.isPause) {
        pauseState = true
        isRestState = prevState.timer.isRest
      } else {
        pauseState = false
        isRestState = !prevState.timer.isRest
      }
      return {
        ...prevState,
        timer: {
          ...prevState.timer,
          isRest: isRestState,
          isRunning: !prevState.timer.isRunning,
          isPause: pauseState
        }
      }
    })
    // ---------------------------------------------------
    let count, interval
    timerReference.current = setInterval(() => {
      pomodoroSetState(prevState => {
        if (prevState.timer.count === 0) {
          clearInterval(timerReference.current)
          timerReference.current = null
          if (prevState.timer.isRest) {
            interval = prevState.timer.interval
            count = prevState.input.minute * 60
          } else {
            interval = prevState.timer.interval + 1
            count = prevState.input.rest * 60
          }
          return {
            ...prevState,
            timer: {
              ...prevState.timer,
              isRunning: !prevState.timer.isRunning,
              interval: interval,
              count: count
            }
          };
        }
        // isWorking true
        return {
          ...prevState,
          timer: {
            ...prevState.timer,
            count: prevState.timer.count - 1
          }
        }
      })
    }, 1000)
  }, [])

  // 정지 이벤트
  const pauseTimer = useCallback(() => {
    console.log("pause 버튼 작동")
    pomodoroSetState(prevState => {
      return {
        ...prevState,
        timer: {
          ...prevState.timer,
          isRunning: false,
          isPause: true
        }
      }
    })

    if (timerReference.current) {
      clearInterval(timerReference.current)
      timerReference.current = null
    }
  }, []);

  // reset 이벤트
  const resetTimer = () => {
    clearInterval(timerReference.current)
    timerReference.current = null
    pomodoroSetState(prevState => {
      return {
        ...prevState,
        timer: {
          ...prevState.timer,
          isRunning: false,
          count: prevState.input.minute * 60,
          isPause: false
        }
      }
    })
    alert("타이머 시간을 초기화 했습니다.^^")
    console.log("reset 버튼 작동")
  };

  // text file 분을 state set
  const setFocuseTime = (event) => {
    pomodoroSetState(prevState => {
      return {
        ...prevState,
        input: {
          ...prevState.input,
          // 문자열로 인식할수 있으므로 parseInt로 value설정
          minute: parseInt(event.target.value)
        },
        timer: {
          ...prevState.timer,
          count: parseInt(event.target.value) * 60
        }
      }
    })
  }

  //  휴식 시간 설정
  const setRestTime = (event) => {
    pomodoroSetState(prevState => {
      return {
        ...prevState,
        input: {
          ...prevState.input,
          rest: parseInt(event.target.value)
        },
        timer: {
          ...prevState.timer,
          count: parseInt(event.target.value) * 60
        }
      }
    })
  }

  return (
      <Grid2 container={"true"}>
        <Grid2 sm={6}>
          <Paper variant="elevation" elevation={"4"} sx={{borderRadius: 20}}>

            {/* 상단 시간 영역*/}
            <Stack marginLeft={4} padding={2}>
              <Typography color={"orangered"} fontWeight={"bolder"} flexGrow={1}
                          variant={"h1"}>
                {pomodoroState.timer.count ? calcTime(pomodoroState.timer.count)
                    : 0}
              </Typography>
            </Stack>
            <Divider variant={"middle"}/>

            {/* 하단 버튼 영역*/}
            <Stack direction={"row"} spacing={3} padding={2}
                   justifyContent={"center"}>
              {/* 일시정지 버튼 */}
              {
                  pomodoroState.timer.isRunning
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
                pomodoroState.timer.isRunning
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
              {/* onChang시 (event를 넣지않아도 해당 이벤트의 event 정보가 넘어가므로 index시에만 전달하기) */}
              <TextField sx={{minWidth: 200, marginRight: 10}}
                         label="Value 0 ~ 60"
                         onChange={setFocuseTime}
                         maxRows={1}
                         type={"number"}
                         value={pomodoroState.input.minute}
                         inputProps={{
                           inputMode: 'numeric',
                           pattern: '[0-9]{2}'
                         }}
                         disabled={pomodoroState.timer.isRunning}
              >
              </TextField>
            </Stack>
            <Divider variant={"middle"}/>

            {/*초단위 설정 화면*/}
            <Stack direction={"row"} alignItems={"center"} padding={1}>
              <Typography variant={"h5"} flexGrow={1} marginLeft={5}>
                Select  Rest
              </Typography>
              <TextField sx={{minWidth: 200, marginRight: 10}}
                         label="Value 0 ~ 60"
                         onChange={setRestTime}
                         type={"number"}
                         inputProps={{
                           inputMode: 'numeric',
                           pattern: '[0-9]{2}'
                         }}
                         value={pomodoroState.input.rest}
                         disabled={pomodoroState.timer.isRunning}
              >
              </TextField>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
  )
}