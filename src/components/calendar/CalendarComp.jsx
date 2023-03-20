import Calendar from "react-calendar";
import {Paper} from "@mui/material";
import Box from "@mui/material/Box";
import CircularStatic from "../today/todos/CircularProgressWithLabel";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
export default function CalendarComp() {
  const intervalCount = useSelector((state) => state.pomodoro.result.interval)
  const todoCount = useSelector((state) => state.todo.result)
  const dispatch = useDispatch()
  const [results, setResult] = useState({count:[]})

  // useEffect(()=>{
  //   setResult({
  //     count: [10, 3, 5, 6, 7, 8, 9, 10, 20, 30, 50, 80, 10, 20, 30, 40],
  //   })
  // }, [])

  return (
      <Paper variant={"elevation"} elevation={4} >
          <Calendar
              minDetail={"year"}
              defaultValue={new Date()}
              onClickDay={(value, event) => {
                const date = new Date(value)
              }}
              tileContent={
                (dateInfo) => {
                  const date = dateInfo.date
                  for (let i = 0; i < results.count.length; i++) {
                    if (date.getDate() === i+1) {
                      return (
                          <Box sx={{paddingTop: 2}}>
                            <CircularStatic progress={results.count[i]}/>
                            <CircularStatic progress={intervalCount}/>
                          </Box>
                      )
                    }
                  }
                  // if (date.getDate() === 4) {
                  //   return (
                  //       <Box sx={{paddingTop: 2}}>
                  //         <CircularStatic progress={intervalCount}/>
                  //       </Box>
                  //   )
                  // } else if (date.getDate() < 4) {
                  //   return (
                  //       <Box sx={{paddingTop: 2}}>
                  //         {/*<CircularStatic progress={10}/>*/}
                  //       </Box>
                  //   )
                  // } else {
                  //   return (
                  //       <Box sx={{paddingTop: 2, height: "50px"}}></Box>
                  //   )
                  // }
                }
              }
          />
      </Paper>
  )
}