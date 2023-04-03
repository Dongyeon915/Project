import Calendar from "react-calendar";
import {Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {myRequestGenerator} from "../../helper/helper";
import {getAllTodoActionCreator} from "../../redux/actions/todoAction";

export default function CalendarComp() {
  const pomodoro = useSelector((state) => state.pomodoro)
  const todo = useSelector((state) => state.todo)
  const dispatch = useDispatch()
  const [results, setResult] = useState({count: []})

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

        />
      </Paper>
  )
}