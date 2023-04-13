import {Box, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useDispatch, useSelector} from "react-redux";
import {myRequestGenerator} from "../../helper/helper";
import {getUserResult} from "../../redux/actions/todoAction";
import {useEffect, useState} from "react";
import {
  setInputMinute, setRestTimeStateActionCreator,
  setTimeActionCreator
} from "../../redux/actions/pomodoroAction";

export default function Total() {

  const todo = useSelector(state => state.todo);
  const pomodoro = useSelector(state => state.pomodoro);
  const dispatch = useDispatch();


  const [userResultState,setuserResult] = useState({
    arrRest : [],
  })

  const [userIntervalState,setuserInterval] = useState({
    intervalArr : [],
  })


  // 유저의 아이디로 rest.clear를 가져온다
  useEffect(() => {
    fetch(myRequestGenerator(`/result/userId`), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: 2,
      })
    }).then(response => response.json())
    .then(result => {
      setuserResult(prevState => {
        return {
          ...prevState,
          arrRest : result
        }
      })
    }).catch(error => console.log(error))
  },[])


    useEffect(() => {
      fetch(myRequestGenerator(`/pomodoro/userId`), {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          userId: 2,
        })
      }).then(response => response.json())
      .then(result => {
        setuserInterval(prevState => {
          return {
            ...prevState,
            intervalArr : result
          }
        })
      }).catch(error => console.log(error))
    },[])

  // 가져온 유저의 값을 합쳐서 사용하기위해서 변환과정
  var restValue = 0;
  var clearValue = 0;
  var interValValue = 0;
  for (let i = 0; i < userResultState.arrRest.length; i++) {
    restValue += parseInt(userResultState.arrRest[i].rest_task)
  }
  // clear밸류 작업
  for (let i = 0; i < userResultState.arrRest.length; i++) {
    clearValue += parseInt(userResultState.arrRest[i].clear_task)
  }

  // 인터벌 합치기 작업
  for (let i = 0; i < userIntervalState.intervalArr.length; i++) {
    interValValue += parseInt(userIntervalState.intervalArr[i].interval)
  }

  console.log(userIntervalState.intervalArr)

  return (
      <Grid2 sx={{backgroundColor:"pink",}} minHeight={500}>
        <Stack sx={{backgroundColor:"yellow"}} direction={"row"} justifyContent={"center"} spacing={15} padding={3}>
          <Grid2 sx={{backgroundColor:"red",minWidth:300,minHeight:300}} padding={2}>
            <Typography variant={"h2"} textAlign={"center"}>
              CLEAR
            </Typography>
            <Typography variant={"h2"} textAlign={"center"} padding={6}>
              {clearValue}
            </Typography>
          </Grid2>
          <Grid2 sx={{backgroundColor:"red",minWidth:300,minHeight:300}} padding={2}>
            <Typography variant={"h2"} textAlign={"center"}>
              INTERVAL
            </Typography>
            <Typography variant={"h2"} textAlign={"center"} padding={6}>
              {interValValue}
            </Typography>
          </Grid2>
          <Grid2 sx={{backgroundColor:"red",minWidth:300,minHeight:300}} padding={2}>
            <Typography variant={"h2"} textAlign={"center"}>
              REST
            </Typography>
            <Typography variant={"h2"} textAlign={"center"} padding={6}>
              {restValue}
            </Typography>
          </Grid2>
        </Stack>
      </Grid2>
  )
}