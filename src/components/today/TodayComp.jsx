import Grid2 from "@mui/material/Unstable_Grid2";
import {Avatar, Box, CircularProgress, Container} from "@mui/material";
import TaskComp from "./TaskComp";
import Calendar from "react-calendar";
import "../../css/calendar.css";
import {GitHub} from "@mui/icons-material";
import CircularStatic from "./CircularProgressWithLabel";

const localStorage = window.localStorage;

export default function TodayComp() {

  return (

      <Container fixed={"true"}>
        <Grid2 container={"true"} lg={12} spacing={2}>
          {/*<Grid2 lg={12}>*/}
          {/*  <Paper variant={3}>*/}
          {/*    상단 Grid*/}
          {/*    <RepositoriesComp/>*/}
          {/*  </Paper>*/}
          {/*</Grid2>*/}
        </Grid2>
        <Grid2 container="true" spacing={2} sm={12}>
          <Grid2 sm={6}>
            <TaskComp/>
          </Grid2>
          <Grid2 sm={6}>
            <Calendar
                minDate={new Date(2023, 2, 1)}
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
                            <CircularStatic progress={70} />
                          </Box>
                      )
                    } else if(date.getDate() < 4) {
                      return (
                          <Box sx={{paddingTop: 2}}>
                            <CircularStatic progress={10} />
                          </Box>
                      )
                    } else  {
                      return (
                          <Box sx={{paddingTop: 2, height: "50px"}}></Box>
                      )
                    }
                  }
                }
            />
          </Grid2>
        </Grid2>
      </Container>
  )
}

