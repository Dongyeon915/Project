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
    fetch(myRequestGenerator(`/calendar`), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: 2,
      })
    }).then(response => response.json())
    .then(response => {
      dispatch(getCalendarUserInfoActionCreator(response))
      console.log(response)
    })
    .catch(error => console.log(error))
  }, [])

  console.log(todoResult.date)

  return (
      <Paper variant={"elevation"} elevation={4}>
        <Calendar
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
            tileContent={(activeStartDate) => {
              // 하루 더먼저로 설정된다
              console.log(activeStartDate.date)
              for (let i = 0; i < 1; i++) {
                if (activeStartDate.date.toISOString().split("T")[0] == todoResult.date) {
                  return (
                      <div>
                        <Typography
                        color={"darkred"}
                        >rest : {todoResult.rest} 개</Typography>
                        <Typography
                        color={"green"}
                        >clear : {todoResult.clear} 개</Typography>
                      </div>
                  )
                }
            }
            }}
          />
      </Paper>

  )
}