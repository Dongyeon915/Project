import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Divider from "@mui/material/Divider";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const pomodoroMinut = [
  {
    value: 'timeSet25',
    label: 25,
  },
  {
    value: 'timeSet45',
    label: 50,
  },
  {
    value: 'timeSet60',
    label: 60,
  },
];

const pomodorosecond = [
  {
    value: 'timeSet0',
    label: 0,
  },
  {
    value: 'timeSet25',
    label: 25,
  },
  {
    value: 'timeSet45',
    label: 45,
  },
  {
    value: 'timeSet60',
    label: 60,
  },
];

export default function PomodoroComp() {
  return (
      <Grid2 container={"true"}>
        <Grid2 sm={6} >
          <Paper variant={"elevation"} elevation={4} sx={{borderRadius: 20}}>
            <Stack marginLeft={4} padding={2}>
              <Typography color={"orangered"} fontWeight={"bolder"} flexGrow={1}
                          variant={"h1"}>25 분 00 초</Typography>
            </Stack>
            <Divider variant={"middle"}/>
            <Stack direction={"row"} spacing={3} padding={2}
                   justifyContent={"center"}>
              <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                      color={"warning"}>
                <NotStartedIcon sx={{marginRight: 1}}/>Stop</Button>
              <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                      color={"success"}>
                <PlayCircleOutlineIcon sx={{marginRight: 1}}/>Start</Button>
              <Button sx={{padding: 1}} variant={"contained"} size={"large"}
                      color={"error"}>
                <RestartAltIcon sx={{marginRight: 1}}/>Reset</Button>
            </Stack>
          </Paper>
        </Grid2>


        {/*타이머 설정창*/}
        <Grid2 sm={6} >
          <Paper>
            <Typography variant={"h3"} flexGrow={1} marginLeft={10} color={"orangered"} fontWeight={"bolder"}>
              Pomodoro Timer
            </Typography>
            <Divider variant={"middle"}/>

            {/*분단위을 설정하는 부분*/}
            <Stack direction={"row"} alignItems={"center"} padding={1}>
              <Typography variant={"h5"} flexGrow={1} marginLeft={5}>
                Select Minute
              </Typography>
              <TextField sx={{minWidth: 200, marginRight: 10}}
                         id="outlined-select-currency"
                         select
                         label="SelectMinute"
              >
                {pomodoroMinut.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Divider variant={"middle"}/>

            {/*초단위 설정 화면*/}
            <Stack direction={"row"} alignItems={"center"} padding={1}>
              <Typography variant={"h5"} flexGrow={1} marginLeft={5}>
                Select Second
              </Typography>
              <TextField sx={{minWidth: 200, marginRight: 10}}
                         id="outlined-select-currency"
                         select
                         label="SelectMinute"
              >
                {pomodorosecond.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Paper>


        </Grid2>
      </Grid2>
  )
}