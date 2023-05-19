import {Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {defaultTotal, totalFetchData, totalPomodoroFetchData} from "../../redux/api/totalAPI"

export default function Total() {

  const [userResultState, setuserResult] = useState({
    arrRest: [],
  })

  const [userIntervalState, setuserInterval] = useState({
    intervalArr: [],
  })

// const total = useSelector(state => state.total)
  const authInfo = useSelector(state => state.login)

  //  Redux Store에서 꺼내온다!
  const accesstoken = authInfo.access_token;

  // 유저의 아이디로 rest.clear를 가져온다
  useEffect(() => {
    // fetch(`/result/userId`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${accesstoken}`
    //   },
    //   body: JSON.stringify({
    //     user_id: authInfo.userInfo.id,
    //   })
    // }).then(response => {
    //   if (response.status === 401) {
    //     throw new Error("Token 인증에 실패하였습니다.")
    //   }else if (response.status === 403){
    //     throw new Error("접근 범위가 아닙니다.")
    //   }else if (response.status === 500){
    //     throw new Error("서버 관리자에게 문의 해주세요")
    //   }
    //   return response.json()
    // }).then(result => {
    //   setuserResult(prevState => {
    //     return {
    //       ...prevState,
    //       arrRest: result
    //     }
    //   })
    // }).catch(error => console.log(error.toLocaleString()))
    totalFetchData(accesstoken,authInfo,setuserResult)
  }, [])
  // pomodoro interval 가져오기
  useEffect(() => {
    totalPomodoroFetchData(accesstoken,authInfo,setuserInterval)
    // fetch(`/pomodoro/userId`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${accesstoken}`
    //   },
    //   body: JSON.stringify({
    //     userId: authInfo.userInfo.id,
    //   })
    // }).then(response => {
    //   if (response.status === 401) {
    //     throw new Error("Token 인증에 실패하였습니다.")
    //   } else if (response.status === 403) {
    //     throw new Error("접근 범위가 아닙니다.")
    //   } else if (response.status === 500) {
    //     throw new Error("서버 관리자에게 문의 해주세요")
    //   }
    //   return response.json()
    // })
    // .then(result => {
    //   setuserInterval(prevState => {
    //     return {
    //       ...prevState,
    //       intervalArr: result
    //     }
    //   })
    // }).catch(error => console.log(error.toLocaleString()))
  }, [])

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

  return (
      <Grid2 minHeight={500}
             sx={{backgroundColor: "#2F4858", borderRadius: "80px"}}>
        <Grid2 sx={{
          backgroundColor: "#2F4858",
          minWidth: 300,
          minHeight: 300,
          borderRadius: "50px"
        }} padding={1}>
          <Typography
              sx={{fontFamily: "Oswald", color: "#F3EED9", fontSize: "150px"}}
              textAlign={"center"}>
            My performance
          </Typography>
        </Grid2>
        <Stack sx={{backgroundColor: "#2F4858", borderRadius: "50px"}}
               direction={"row"} justifyContent={"center"} spacing={15}
               padding={3}>
          <Grid2 sx={{
            backgroundColor: "#F3EED9",
            minWidth: 300,
            minHeight: 300,
            borderRadius: "50px"
          }} padding={2}>
            <Typography sx={{fontFamily: "Oswald"}} variant={"h2"}
                        textAlign={"center"}>
              CLEAR
            </Typography>
            <Typography sx={{fontFamily: "Oswald"}} variant={"h2"}
                        textAlign={"center"} padding={6}>
              {clearValue}
            </Typography>
          </Grid2>
          <Grid2 sx={{
            backgroundColor: "#F3EED9",
            minWidth: 300,
            minHeight: 300,
            borderRadius: "50px"
          }} padding={2}>
            <Typography sx={{fontFamily: "Oswald"}} variant={"h2"}
                        textAlign={"center"}>
              INTERVAL
            </Typography>
            <Typography sx={{fontFamily: "Oswald"}} variant={"h2"}
                        textAlign={"center"} padding={6}>
              {interValValue}
            </Typography>
          </Grid2>
          <Grid2 sx={{
            backgroundColor: "#F3EED9",
            minWidth: 300,
            minHeight: 300,
            borderRadius: "50px"
          }} padding={2}>
            <Typography sx={{fontFamily: "Oswald"}} variant={"h2"}
                        textAlign={"center"}>
              REST
            </Typography>
            <Typography sx={{fontFamily: "Oswald"}} variant={"h2"}
                        textAlign={"center"} padding={6}>
              {restValue}
            </Typography>
          </Grid2>
        </Stack>
      </Grid2>
  )
}