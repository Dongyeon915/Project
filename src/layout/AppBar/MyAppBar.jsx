import {AppBar, Avatar, IconButton, Toolbar, Typography} from "@mui/material";
import * as React from "react";
import GitUser from "../../components/user-comp/GitUser";
import {GitHub} from "@mui/icons-material";

function MyAppBar({handleDrawerToggle}) {
  return (
      <AppBar
          position="fixed"
          sm
          sx={{
            zIndex: 1500,
            marginLeft: {sm: "240px"},
            backgroundColor:"#555555"
          }}
      >
        <Toolbar>
          <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{mr: 2, display: {sm: 'none'}}}
          >
          </IconButton>
          <IconButton>
            <GitHub/>
          </IconButton>
          <Typography variant={"h6"} sx={{flexGrow: 1}}>My GitHub</Typography>
          <IconButton>
            <Avatar alt={"Github Profile Image"} src={GitUser.avatar_url}/>
          </IconButton>
        </Toolbar>
      </AppBar>
  )
}

export default MyAppBar
