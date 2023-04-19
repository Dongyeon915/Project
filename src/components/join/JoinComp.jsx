import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import {Button, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';



export default function JoinComp() {
  return (
      <Grid2 height={"70%"} container={"true"}
             justifyContent={"center"} padding={2}>
        <Stack padding={2} width={600}
               sx={{backgroundColor: "#47817F", borderRadius: 20}}
               alignItems={"center"}>
          <Typography variant={"h2"} color={"#F3EED9"} fontFamily={"Oswald"}>
            Join The Member
          </Typography>
          <Stack marginTop={7} alignItems={"center"}>
            <Typography variant={"h5"} color={"#F3EED9"} fontFamily={"Oswald"}>
              Email
            </Typography>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
              <AlternateEmailIcon
                  sx={{mr: 1, my: 0.5}}/>
              <TextField color={"success"} label="email" variant="standard"/>
              <Button sx={{marginLeft: 3, color: "#F3EED9"}}
                      variant={"contained"} color={"inherit"}>
                <Typography fontFamily={"Oswald"} color={"black"}>check</Typography>
                </Button>
            </Box>
            <Typography variant={"h5"} color={"#f2edd8"} fontFamily={"Oswald"}
                        marginTop={5}>
              Password
            </Typography>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
              <PasswordIcon sx={{mr: 1, my: 0.5}}/>
              <TextField color={"success"} label="password" variant="standard"
                         sx={{marginRight: 13}}/>
            </Box>
            <Button sx={{marginTop: 7, color: "#F3EED9"}}
                    variant={"contained"} color={"inherit"}> <Typography fontFamily={"Oswald"} color={"black"}>Join</Typography></Button>
          </Stack>
        </Stack>


      </Grid2>
  )
}