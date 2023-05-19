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
import CalendarCompCopy from "../calendar/CalendarComp";
import PomodoroComp from "./pomodoro/PomodoroComp"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TodayComp() {

  return (

      <Container fixed={"true"}
                 sx={{backgroundColor: "#2F4858", borderRadius: 8}}>
        <Grid2 container={"true"} lg={12} spacing={2}>
          <Grid2 lg={12}>
            <Accordion sx={{backgroundColor: "#93AC9E"}}>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
              >
                <Typography sx={{fontFamily: "Oswald"}} color={"#2F4856"}
                            variant={"h5"}>Calendar</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CalendarCompCopy/>
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

