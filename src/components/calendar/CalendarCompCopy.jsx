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
import Box from "@mui/material/Box";
import CircularStatic from "../today/todos/CircularProgressWithLabel";

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
      // console.log(response)
    })
    .catch(error => console.log(error))
  }, [])

  console.log(todoResult)


  return (
      <Paper variant={"elevation"} elevation={4}>
        <Calendar
            defaultValue={new Date()}
            activeStartDate={new Date()}
            onClickDay={(value, event) => {
                const date = new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().split("T")[0]
              alert(date)
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
              // const newDateValue = new Date(activeStartDate.date.getTime() - activeStartDate.date.getTimezoneOffset() * 60000).toISOString().split("T")[0]
              for (let i = 0; i < todoResult.length; i++) {
                    if (activeStartDate.getDate() === todoResult.getDate) {
                      return (
                          <Box sx={{paddingTop: 2}}>
                            <p>vjzvso</p>

                          </Box>
                      )
                    }}
            }}
          />
      </Paper>

  )
}