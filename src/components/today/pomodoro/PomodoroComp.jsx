import Grid2 from "@mui/material/Unstable_Grid2";
import {Button, Paper, Stack, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function PomodoroComp() {
  return (
      <Grid2 container={"true"} sx={{backgroundColor: "pink"}}>
        <Grid2 sm={6} sx={{backgroundColor: "yellow"}}>
          <Paper variant={"elevation"} elevation={4} sx={{borderRadius:20}}>
            <Stack marginLeft={4} padding={2}>
              <Typography color={"orangered"} fontWeight={"bolder"} flexGrow={1} variant={"h1"}>25 분 00 초</Typography>
            </Stack>
            <Divider />
            <Stack direction={"row"} spacing={3} padding={2}
                   justifyContent={"center"}>
              <Button sx={{padding:1}} variant={"contained"} size={"large"} color={"warning"}>
                <NotStartedIcon sx={{marginRight:1}}/>Stop</Button>
              <Button sx={{padding:1}} variant={"contained"} size={"large"} color={"success"}>
                <PlayCircleOutlineIcon sx={{marginRight:1}}/>Start</Button>
              <Button sx={{padding:1}} variant={"contained"} size={"large"} color={"error"}>
                <RestartAltIcon sx={{marginRight:1}}/>Reset</Button>
            </Stack>
          </Paper>

        </Grid2>
        {/*타이머 설정창*/}
        <Grid2 sm={6} sx={{backgroundColor: "green"}}>
          <Paper variant={"elevation"} elevation={4}>
            
          </Paper>
        </Grid2>
      </Grid2>
  )
}