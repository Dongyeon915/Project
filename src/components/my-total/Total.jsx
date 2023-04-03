import {Box, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useDispatch, useSelector} from "react-redux";

export default function Total() {

  const todo = useSelector(state => state.todo);
  const pomodoro = useSelector(state => state.pomodoro);
  const dispatch = useDispatch();

  return (
      <Grid2 sx={{backgroundColor:"pink",}} minHeight={500}>
        <Stack sx={{backgroundColor:"yellow"}} direction={"row"} justifyContent={"center"} spacing={15} padding={3}>
          <Grid2 sx={{backgroundColor:"red",minWidth:300,minHeight:300}} padding={2}>
            <Typography variant={"h2"} textAlign={"center"}>
              CLEAR
            </Typography>
            <Typography variant={"h2"} textAlign={"center"} padding={6}>
              123
            </Typography>
          </Grid2>
          <Grid2 sx={{backgroundColor:"red",minWidth:300,minHeight:300}} padding={2}>
            <Typography variant={"h2"} textAlign={"center"}>
              INTERVAL
            </Typography>
            <Typography variant={"h2"} textAlign={"center"} padding={6}>
              12
            </Typography>
          </Grid2>
          <Grid2 sx={{backgroundColor:"red",minWidth:300,minHeight:300}} padding={2}>
            <Typography variant={"h2"} textAlign={"center"}>
              REST
            </Typography>
            <Typography variant={"h2"} textAlign={"center"} padding={6}>
              11
            </Typography>
          </Grid2>
        </Stack>
      </Grid2>
  )
}