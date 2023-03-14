import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Paper,
  Typography
} from "@mui/material";
import TodoComp from "./todos/TodoComp";
import "../../css/calendar.css";
import CalendarComp from "./todos/CalendarComp";
import PomodoroComp from "./pomodoro/test-pomodoro/PomodoroComp"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TodayComp() {

  return (

      <Container fixed={"true"} sx={{backgroundColor:"#EE5D50FF",borderRadius:8}}>
        <Grid2 container={"true"} lg={12} spacing={2}>
          <Grid2 lg={12}>
            <Accordion sx={{backgroundColor:"#3CB371"}}>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
              >
                <Typography color={"white"} variant={"h5"}>Calendar</Typography>
              </AccordionSummary>
              <AccordionDetails >
                <CalendarComp/>
              </AccordionDetails>
            </Accordion>
          </Grid2>
        </Grid2>
        {/*today 하단 TodoTask,Calendar*/}
        <Grid2 container="true" spacing={1} sm={12}>
          <Grid2 sm={6} padding={1}>
            <TodoComp/>
          </Grid2>
          <Grid2 sm={6} padding={2}>
            <Paper variant={"elevation"} elevation={3}>
              <PomodoroComp/>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
  )
}

