import {AppBar, Avatar, IconButton, Toolbar, Typography} from "@mui/material";
import {githubUserInfo} from "../../sample/githubInfo";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";

function MyAppBar({handleDrawerToggle}) {
  return (
      <AppBar
          position="fixed"
          sm
          sx={{
            zIndex: 1500,
            marginLeft: {sm: "240px"},
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
          <Typography variant={"h6"} sx={{flexGrow:1}}>🔥 My Diary Github</Typography>
          <IconButton>
            <Avatar alt={"Github Profile Image"} src={githubUserInfo.avatar_url} />
          </IconButton>
        </Toolbar>
      </AppBar>
  )
}

export default MyAppBar
