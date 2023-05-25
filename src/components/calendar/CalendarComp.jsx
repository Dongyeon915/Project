import Calendar from "react-calendar";
import {Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  fetchCalendarData, fetchCalendarGetUserByDateResult,
  fetchCalendarGetUserByResult
} from "../../redux/api/calendarAPI";

export default function CalendarComp() {
  const todo = useSelector((state) => state.todo)
  const todoResult = useSelector((state) => state.todoResult)
  const dispatch = useDispatch();

  const [stateTodoResult, setTodoResult] = useState({
    todoList: []
  })

  //  Redux Store에서 꺼내온다!
  const authInfo = useSelector(state => state.login)
  const accessToken = authInfo.access_token;

  useEffect(() => {
    fetchCalendarData(accessToken, authInfo.userInfo.id, setTodoResult);
  }, [todo.result, todoResult.result])

  const getRsult = (date,dispatch) => {
    fetchCalendarGetUserByResult(accessToken, authInfo, date,dispatch)
  }

  const clickDayEventHandler = (value, event) => {
    const date = new Date(value.getTime() - value.getTimezoneOffset()
        * 60000).toISOString().split("T")[0]
    fetchCalendarGetUserByDateResult(accessToken,authInfo,date,dispatch)
    getRsult(date,dispatch)
  }

  // 우리나라 시간대로 변경하고 잘라줘서 넘겨줘야 하루 뒤가아닌 오늘날짜로 가능하다
  //   const date = new Date(value.getTime() - value.getTimezoneOffset()
  //                   * 60000).toISOString().split("T")[0]
  return (
      <Paper variant={"elevation"} elevation={4}>
        <Calendar
            defaultValue={new Date()}
            activeStartDate={new Date()}
            onClickDay={clickDayEventHandler}
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