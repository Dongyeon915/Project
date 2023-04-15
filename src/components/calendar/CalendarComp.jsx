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

export default function CalendarComp() {
  const pomodoro = useSelector((state) => state.pomodoro)
  const todo = useSelector((state) => state.todo)
  const todoResult = useSelector((state) => state.todoResult)
  const dispatch = useDispatch()

  const [stateTodoResult, setTodoResult] = useState({
    todoList: [],
    rest: null,
    clear: null,
    date: null
  })

  useEffect(() => {
    fetch(myRequestGenerator(`/calendar/allUserCalendar`), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: 2,
      })
    }).then(response => response.json())
    .then(response => {
      console.log(response)
      setTodoResult(prevState => {
        return {
          ...prevState,
          todoList: response
        }
        // return {
        //   ...prevState,
        //   rest: response.rest_task,
        //   clear: response.clear_task,
        //   date: response.date
        // }
      })
    })
    .catch(error => console.log(error))
  }, [])
  // console.log("---------------------------------------")
  // console.log(stateTodoResult.todoList)


  const getRsult = (value) => {
    fetch(myRequestGenerator(`/result`), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: 2,
        date: value
      })
    }).then(response => response.json())
    .then(result => {
      dispatch(getUserResult(result))
    }).catch(error => console.log(error))
  }

  return (
      <Paper variant={"elevation"} elevation={4}>
        <Calendar
            defaultValue={new Date()}
            activeStartDate={new Date()}
            onClickDay={(value, event) => {
              const date = new Date(value.getTime() - value.getTimezoneOffset()
                  * 60000).toISOString().split("T")[0]
              fetch(myRequestGenerator(`/schedules/user`), {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  user_id: 2,
                  date: date
                })
              }).then(response => response.json())
              .then(newTodo => {
                dispatch(getAllTodoActionCreator(newTodo))
                getRsult(value)
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
              // var date = activeStartDate.date
              // date = new Date(date.getTime() - date.getTimezoneOffset()
              //     * 60000).toISOString().split("T")[0]
              // if (date == stateTodoResult.date) {
              //   return (
              //       <Grid2 padding={1}>
              //         <Typography color={"green"} variant={"body2"}>
              //           REST : {stateTodoResult.rest}
              //         </Typography>
              //         <Typography color={"red"} variant={"body2"}>
              //           CLEAR : {stateTodoResult.clear}
              //         </Typography>
              //       </Grid2>
              //   )
              // }
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