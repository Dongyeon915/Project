import Grid2 from "@mui/material/Unstable_Grid2";
import {Container, Paper} from "@mui/material";
import TodoComp from "./todos/TodoComp";
import "../../css/calendar.css";
import CalendarComp from "./todos/CalendarComp";
import PomodoroComp from "./pomodoro/test-pomodoro/PomodoroComp";
import PomodoroCopy from "./pomodoro/PomodoroCopy";

export default function TodayComp() {

  return (

      <Container fixed={"true"}>
        <Grid2 container={"true"} lg={12} spacing={2}>
          <Grid2 lg={12}>
            <Paper variant={3}>
              <PomodoroCopy/>
            </Paper>
          </Grid2>
        </Grid2>

        {/*today 하단 TodoTask,Calendar*/}
        <Grid2 container="true" spacing={2} sm={12}>
          <Grid2 sm={6}>
            <TodoComp/>
          </Grid2>
          <Grid2 sm={6} padding={2}>
            <Paper variant={"elevation"} elevation={3}>
              <CalendarComp/>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
  )
}

