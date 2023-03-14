import Calendar from "react-calendar";
import {Paper} from "@mui/material";
export default function CalendarComp() {

  return (
      <Paper variant={"elevation"} elevation={4} >
          <Calendar
              minDetail={"year"}
              defaultValue={new Date()}
              onClickDay={(value, event) => {
                console.log(value)
              }}
              // tileContent={
              //   (dateInfo) => {
              //     const date = dateInfo.date
              //     if (date.getDate() === 4) {
              //       return (
              //           <Box sx={{paddingTop: 2}}>
              //             <CircularStatic progress={70}/>
              //           </Box>
              //       )
              //     } else if (date.getDate() < 4) {
              //       return (
              //           <Box sx={{paddingTop: 2}}>
              //             {/*<CircularStatic progress={10}/>*/}
              //           </Box>
              //       )
              //     } else {
              //       return (
              //           <Box sx={{paddingTop: 2, height: "50px"}}></Box>
              //       )
              //     }
              //   }
              // }
          />
      </Paper>
  )
}