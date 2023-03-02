import Grid2 from "@mui/material/Unstable_Grid2";
import TodoHead from "./TodoHead";
import TodoInput from "./TodoInput";
import {Divider, Paper} from "@mui/material";
import TodoItem from "./TodoItem";

function TodayTemplate() {

  return (
      <Grid2 lg={6}>
        <Paper variant={"elevation"} elevation={4} sx={{padding: 3,}}>
          <TodoHead/>
          <Divider sx={{marginTop: 1, backgroundColor: "black",}}/>
          <TodoItem/>
          <TodoInput/>
        </Paper>
      </Grid2>
  )
}
export default TodayTemplate