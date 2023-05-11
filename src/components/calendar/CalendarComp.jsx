import Calendar from "react-calendar";
import {Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {myRequestGenerator} from "../../helper/helper";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  getAllTodoActionCreator,
  getUserResult
} from "../../redux/actions/todoAction";
import {response} from "../../sample/Complete";

export default function CalendarComp() {
  const pomodoro = useSelector((state) => state.pomodoro)
  const todo = useSelector((state) => state.todo)
  const todoResult = useSelector((state) => state.todoResult)
  const dispatch = useDispatch()


  const [stateTodoResult, setTodoResult] = useState({
    todoList: []
  })

  //  Redux Store에서 꺼내온다!
  const authInfo = useSelector(state => state.login)
  // 저장시 숫자로 넣지않으면 백단 오류남
  const accessToken = authInfo.access_token;

  useEffect(() => {
    fetch(`/calendar/allUserCalendar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        user_id: authInfo.userInfo.id
      })
    }).then(response => response.json())
    .then(response => {
      setTodoResult(prevState => {
        return {
          ...prevState,
          todoList:response
        }
      })
    })
    .catch(error => console.log("calendar오류 서버 관리자에게 문의 해주세요."))
  //   todoTask를 추가하면 새로 랜더 되야하기때문에 result의 결과값의 변경시를 추가해줌
  //   restTask삭제시 todoResult.result 캘린더에 랜더되지않기에 추가
  }, [todo.result,todoResult.result])

  const getRsult = (date) => {
    fetch(`/result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        user_id: authInfo.userInfo.id,
        date: date
      })
    }).then(response => response.json())
    .then(result => {
      dispatch(getUserResult(result))
    }).catch(error => console.log(error))
  }

  // 우리나라 시간대로 변경하고 잘라줘서 넘겨줘야 하루 뒤가아닌 오늘날짜로 가능하다
  //   const date = new Date(value.getTime() - value.getTimezoneOffset()
  //                   * 60000).toISOString().split("T")[0]
  return (
      <Paper variant={"elevation"} elevation={4}>
        <Calendar
            defaultValue={new Date()}
            activeStartDate={new Date()}
            onClickDay={(value, event) => {
              const date = new Date(value.getTime() - value.getTimezoneOffset()
                  * 60000).toISOString().split("T")[0]
              fetch(`/schedules/user`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                  user_id: authInfo.userInfo.id,
                  date: date
                })
              }).then(response => response.json())
              .then(newTodo => {
                dispatch(getAllTodoActionCreator(newTodo))
                getRsult(date)
              }).catch(error => console.log(error))
            }}
            nextLabel={
              <RedoIcon
                  color={"warning"}
              />
            }
            next2Label={
              <RedoIcon
                  color={"success"}
              />
            }
            prevLabel={
              <UndoIcon
                  color={"warning"}
              />
            }
            prev2Label={
              <UndoIcon
                  color={"success"}
              />
            }
            allowPartialRange={
              "true"
            }
            tileContent={(activeStartDate) => {
              var date = activeStartDate.date
              date = new Date(date.getTime() - date.getTimezoneOffset()
                  * 60000).toISOString().split("T")[0]
              for (let i = 0; i < stateTodoResult.todoList.length; i++) {
                if (date == stateTodoResult.todoList[i].date) {
                  return (
                      <Grid2 padding={1}>
                        <Typography color={"green"} variant={"body2"}>
                          REST : {stateTodoResult.todoList[i].rest_task}
                        </Typography>
                        <Typography color={"red"} variant={"body2"}>
                          CLEAR : {stateTodoResult.todoList[i].clear_task}
                        </Typography>
                      </Grid2>
                  )
                }
              }

            }}
        />
      </Paper>

  )
}