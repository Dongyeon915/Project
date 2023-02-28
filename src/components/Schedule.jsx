import {useEffect, useState} from "react";
import {Box, Button, LinearProgress, Stack} from "@mui/material";
import {Delete as DeleteIcon, } from "@mui/icons-material";

function calcTime(time) {
  const hour = parseInt(time / ( 60 * 60));
  time -= (60 * 60) * hour
  const minute = parseInt(time / 60);
  const second = time % 60
  if (hour == 0)
    return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

export default function Schedule() {

  const [state, setState] = useState({
    timer: 0,
    count: 1*60*60 + 3 * 60 + 21,
    test: 1*60*60 + 3 * 60 + 21
  })

  useEffect(() => {
    const interval = setInterval(()=> {
      setState((prevState) => {
        return {
          ...prevState,
          timer: prevState.timer + 1,
          count: prevState.count - 1
        }
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
      <div>
        <h3>{calcTime(state.timer)}</h3>
        <h3>{calcTime(state.count)}</h3>
        <Box sx={{ width: '100%' }}>
          <LinearProgress style={{backgroundColor: '#ff0'}} variant={"buffer"} valueBuffer={100} value={(state.count/state.test) * 100} />
        </Box>
      </div>
  )
}