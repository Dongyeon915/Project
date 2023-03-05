import Grid2 from "@mui/material/Unstable_Grid2";
import {Container} from "@mui/material";
import TaskComp from "./todos/TaskComp";
import "../../css/calendar.css";
import CalendarComp from "./todos/CalendarComp";



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
          <Grid2 sm={6} padding={2}>
            <CalendarComp/>
          </Grid2>
        </Grid2>
      </Container>
  )
}

