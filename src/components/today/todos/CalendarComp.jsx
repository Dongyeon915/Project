import Calendar from "react-calendar";
import {Box} from "@mui/material";
import CircularStatic from "./CircularProgressWithLabel";

export default function CalendarComp(){
  return (
      <Calendar
          minDetail={"year"}
          defaultValue={new Date()}
          onClickDay={(value, event) => {
            console.log("onClickDay")
            console.log(value)
          }}
          tileContent={
            (dateInfo) => {
              const date = dateInfo.date
              if (date.getDate() === 4) {
                return (
                    <Box sx={{paddingTop: 2}}>
                      <CircularStatic progress={70}/>
                    </Box>
                )
              } else if (date.getDate() < 4) {
                return (
                    <Box sx={{paddingTop: 2}}>
                      <CircularStatic progress={10}/>
                    </Box>
                )
              } else {
                return (
                    <Box sx={{paddingTop: 2, height: "50px"}}></Box>
                )
              }
            }
          }
      />
  )
}