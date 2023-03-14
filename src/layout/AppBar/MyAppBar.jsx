import {AppBar, Avatar, IconButton, Toolbar, Typography} from "@mui/material";
import * as React from "react";
import GitUser from "../../components/user-comp/gitUser";
import {GitHub} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
function MyAppBar({handleDrawerToggle}) {
  return (
      <AppBar
          position="fixed"
          sm
          sx={{
            zIndex: 1500,
            marginLeft: {sm: "240px"},
            backgroundColor:"#EE5D50FF"
          }}
      >
        <Toolbar>
          <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{mr: 2, display: {sm: 'none'}}}
          >
            <MenuIcon/>
          </IconButton>
          <IconButton>
            <GitHub/>
          </IconButton>
          <Typography variant={"h6"} sx={{flexGrow: 1}}>My Schedule</Typography>
          <IconButton>
            {/*<Avatar alt={"Github Profile Image"} src={GitUser.avatar_url}/>*/}
          </IconButton>
        </Toolbar>
      </AppBar>
  )
}

export default MyAppBar
