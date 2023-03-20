import Grid2 from "@mui/material/Unstable_Grid2";
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import NotStartedIcon from '@mui/icons-material/NotStartedOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {useCallback, useEffect, useRef, useState} from "react";
import {
  changePauseStateActionCreator,
  changeRestStateActionCreator,
  changeRunningStateActionCreator,
  runTimerActionCreator,
  setInputMinute,
  setInterverStateActionCreator,
  setRestTimeStateActionCreator,
  setTimeActionCreator
} from "../../../../redux/actions/pomodoroAction";
import {useDispatch, useSelector} from "react-redux";

export default function PomodoroCopy() {
  // JavaScript =>  false, null, undefined, 0, ''
  // null 은 초기값이 없기 때문에 false
  // undefined 은 아무것도 없는 상태
  const pomodoro = useSelector(state => state.pomodoro)
  const dispatch = useDispatch()
  const timerReference = useRef(undefined)

  const [timeInputState, setTimeInputState] = useState({
    minute: pomodoro.config.minute,
    rest: pomodoro.config.rest
  })

  function calcTime(epocTime) {
    const hour = parseInt(epocTime / (60 * 60))
    epocTime = epocTime - (hour * 60 * 60)
    const minute = parseInt(epocTime / 60)
    const second = epocTime % 60
    return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(
        2, '0')}`
  }

  function startButtonTitle() {
    // if (pomodoro.timer.state.isPause) {
    //   return "Re-Start"
    // }
    // return "Start"
    return pomodoro.timer.state.isPause ? "Re-Start" : "Start"
  }

  // 시간 설정
  // ref state로 시간을 멈출수 없고 start버튼 누를시 여러개가 실행될수 있고 ref로 만들시 clearInterval관리와 참조해서 다른곳에서 사용할수있다.
  const startTimer = useCallback(() => {
    if (timerReference.current) {
      console.log("Timer Already Exist!")
      return;
    }
    // 조건문 작성시 순서가 중요 하위 순서를 가지않을수 있음 if -> if로 작성시 매번 if문을 체크한다.
    if (pomodoro.timer.state.isPause) {
      dispatch(changeRunningStateActionCreator())
    } else if (pomodoro.timer.state.isRest) {
      console.log("레스트로 바뀌는 순간")
      dispatch(setTimeActionCreator(pomodoro.config.rest))
    } else if (!pomodoro.timer.state.isRest) {
      console.log("러닝으로 바뀌는 순간")
      dispatch(changeRunningStateActionCreator())
      dispatch(setTimeActionCreator(pomodoro.config.minute))
    }
    timerReference.current = setInterval(() => {
      // 카운터 수를 줄이는 dispatch
      dispatch(runTimerActionCreator())
    }, 1)
    //   처음 메모이제이션된 값만을 기억하기에
  }, [pomodoro.timer.state, pomodoro.config])

  // 카운트가 0일시
  useEffect(() => {
    if (pomodoro.config.countValue === 0) {
      clearInterval(timerReference.current)
      timerReference.current = null
      if (pomodoro.timer.state.isRest) {
        dispatch(setTimeActionCreator(pomodoro.config.minute))
        dispatch(changeRestStateActionCreator(false))
      } else if (pomodoro.timer.state.isRunning) {
        dispatch(setTimeActionCreator(pomodoro.config.rest))
        dispatch(changeRestStateActionCreator(true))
        dispatch(setInterverStateActionCreator())
        plusInterval()
      }
    }
  }, [pomodoro.config.countValue])


  const plusInterval = () => {
    fetch("http://localhost:8080/pomodoro", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        interval: 1
      })
    }).then(response => response.json())
    .then(interval => {
          console.log(interval)

        }
    ).catch(error => console.log(error))
  }

  // 정지 이벤트
  const pauseTimerHandler = useCallback(() => {
    if (timerReference.current) {
      clearInterval(timerReference.current)
      timerReference.current = null
    }
    dispatch(changePauseStateActionCreator())
  }, [pomodoro.timer.state.isPause]);

  // reset 이벤트
  const resetTimer = () => {
    clearInterval(timerReference.current)
    timerReference.current = null
    alert("타이머 시간을 초기화 했습니다.^^")
    dispatch(changeRestStateActionCreator())
    dispatch(setTimeActionCreator(pomodoro.config.minute))
  };

  // 초기 시간 설정
  useEffect(() => {
    dispatch(setTimeActionCreator(pomodoro.config.minute))
    return () => {
      timerReference.current && clearInterval(timerReference.current)
    }
  }, [])

  //  휴식 시간 설정
  const setRestTime = (event) => {
    setTimeInputState(prevState => {
      return {
        ...prevState,
        rest: parseInt(event.target.value)
      }
    })
    dispatch(setRestTimeStateActionCreator(event.target.value))
    dispatch(setTimeActionCreator(event.target.value))
  }

  // 분설정
  const setFocuseTime = (event) => {
    setTimeInputState(prevState => {
      return {
        ...prevState,
        minute: parseInt(event.target.value)
      }
    })
    dispatch(setInputMinute(event.target.value))
    dispatch(setTimeActionCreator(event.target.value))
  }

  return (
      <Grid2 container={"true"} direction={"column"} minHeight={500}>
        <Grid2 sm={12}>
          <Paper variant="elevation" elevation={"4"}
                 sx={{borderRadius: 50, backgroundColor: "#ee5d50"}}>
            {/* 상단 시간 영역*/}
            <Stack alignItems={"center"} padding={3}>
              <Typography color={"white"} fontWeight={"bolder"} flexGrow={1}
                          variant={"h1"}>
                {pomodoro.config.countValue ? calcTime(
                        pomodoro.config.countValue)
                    : 0}
              </Typography>
            </Stack>
            <Divider variant={"middle"}/>

            {/* 하단 버튼 영역*/}
            <Stack direction={"row"} spacing={3} padding={2}
                   justifyContent={"center"}>
              {/* 일시정지 버튼 */}
              {
                  pomodoro.timer.state.isRunning
                  && <Button sx={{padding: 1}}
                             variant={"contained"}
                             size={"large"}
                             color={"warning"}
                             onClick={pauseTimerHandler}>
                    <NotStartedIcon sx={{marginRight: 1}}/>
                    Pause
                  </Button>
              }

              {/*  /!* start 버튼 *!/*/}
              {
                  pomodoro.timer.state.isRunning
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
            <Stack direction={"row"} alignItems={"center"} padding={1}>
              <Typography variant={"h5"} flexGrow={1} marginLeft={5}>
                Select Minute
              </Typography>
              {/* onChang시 (event를 넣지않아도 해당 이벤트의 event 정보가 넘어가므로 index시에만 전달하기) */}
              <TextField sx={{minWidth: 200, marginRight: 9}}
                         label="Value 0 ~ 59"
                         onChange={setFocuseTime}
                         type={"number"}
                         value={timeInputState.minute}
                         inputProps={{
                           inputMode: 'numeric',
                           pattern: '[0-9]{2}'
                         }}
                         disabled={pomodoro.timer.state.isRunning}
              >
              </TextField>
            </Stack>
            <Divider variant={"middle"}/>

            {/*휴식 시간 화면*/}
            <Stack direction={"row"} alignItems={"center"} padding={1}>
              <Typography variant={"h5"} flexGrow={1} marginLeft={5}>
                Select Rest
              </Typography>
              <TextField sx={{minWidth: 200, marginRight: 9}}
                         label="Value 0 ~ 59"
                         onChange={setRestTime}
                         type={"number"}
                         inputProps={{
                           inputMode: 'numeric',
                           pattern: '[0-9]{2}'
                         }}
                         value={timeInputState.rest}
                         disabled={pomodoro.timer.state.isRunning}
              >
              </TextField>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
  )
}