import Calendar from "react-calendar";
import {Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {myRequestGenerator} from "../../helper/helper";
import {
  getCalendarUserInfoActionCreator
} from "../../redux/actions/calendarAction";

export default function CalendarComp() {
  const pomodoro = useSelector((state) => state.pomodoro)
  const todo = useSelector((state) => state.todo)
  const todoResult = useSelector((state) => state.todoResult)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(myRequestGenerator(`/calendar/allUserCalendar`), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: 2,
      })
    }).then(response => response.json())
    .then(response => {
      dispatch(getCalendarUserInfoActionCreator(response))
      console.log("------------------------------------------")
      // console.log(response)
    })
    .catch(error => console.log(error))
  }, [])

  return (
      <Paper variant={"elevation"} elevation={4}>
        <Calendar
            defaultValue={new Date()}
            activeStartDate={new Date()}
            // onClickDay={(value, event) => {
            //     const date = new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().split("T")[0]
            //   alert(date)
            //
            //   }}
            // navigationAriaLive={"polite"}
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
            // tileContent={(activeStartDate) => {
            //   // 하루 더먼저로 설정된다
            //   for (let i = 0; i < 31; i++) {
            //     if (new Date(activeStartDate.date.getTime() - activeStartDate.date.getTimezoneOffset() * 60000).toISOString().split("T")[0] == todoResult.date) {
            //       return (
            //           <div>
            //             <Typography
            //             color={"darkred"}
            //             >rest : {todoResult[i].rest} 개</Typography>
            //             <Typography
            //             color={"green"}
            //             >clear : {todoResult[i].clear} 개</Typography>
            //           </div>
            //       )
            //     }
            // }
            // }}
            // onClickDay={(value,event) => {
            // alert(value.toISOString().split("T")[0])
            // }
            //}
          />
      </Paper>

  )
}