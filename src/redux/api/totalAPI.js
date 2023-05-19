// import {useDispatch, useSelector} from "react-redux";
// import {getUserResultActionCreator} from "../../redux/actions/totalAction";
//
// // export function TotalAPI() {
//
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const total = useSelector(state => state.total)
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const dispatch = useDispatch()
//
// // const total = useSelector(state => state.total)
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const authInfo = useSelector(state => state.login)
// //  Redux Store에서 꺼내온다!
// const accessToken = authInfo.access_token;
//
// export const defaultTotal = () => {
//   fetch(`/result/userId`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${accessToken}`
//     },
//     body: JSON.stringify({
//       user_id: authInfo.userInfo.id,
//     })
//   }).then(response => {
//     if (response.status === 401) {
//       throw new Error("Token 인증에 실패하였습니다.")
//     } else if (response.status === 403) {
//       throw new Error("접근 범위가 아닙니다.")
//     } else if (response.status === 500) {
//       throw new Error("서버 관리자에게 문의 해주세요")
//     }
//     return response.json()
//   }).then(result => {
//     dispatch(getUserResultActionCreator(result))
//   }).catch(error => console.log(error.toLocaleString()))
//   // }
//
// }

// 방법2
export const totalFetchData = (accesstoken,authInfo,setuserResult) =>{
  fetch(`/result/userId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accesstoken}`
    },
    body: JSON.stringify({
      user_id: authInfo.userInfo.id,
    })
  }).then(response => {
    if (response.status === 401) {
      throw new Error("Token 인증에 실패하였습니다.")
    }else if (response.status === 403){
      throw new Error("접근 범위가 아닙니다.")
    }else if (response.status === 500){
      throw new Error("서버 관리자에게 문의 해주세요")
    }
    return response.json()
  }).then(result => {
    setuserResult(prevState => {
      return {
        ...prevState,
        arrRest: result
      }
    })
  }).catch(error => console.log(error.toLocaleString()))
}

export const totalPomodoroFetchData = (accesstoken,authInfo,setuserInterval) => {
  fetch(`/pomodoro/userId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accesstoken}`
    },
    body: JSON.stringify({
      userId: authInfo.userInfo.id,
    })
  }).then(response => {
    if (response.status === 401) {
      throw new Error("Token 인증에 실패하였습니다.")
    } else if (response.status === 403) {
      throw new Error("접근 범위가 아닙니다.")
    } else if (response.status === 500) {
      throw new Error("서버 관리자에게 문의 해주세요")
    }
    return response.json()
  })
  .then(result => {
    setuserInterval(prevState => {
      return {
        ...prevState,
        intervalArr: result
      }
    })
  }).catch(error => console.log(error.toLocaleString()))
}