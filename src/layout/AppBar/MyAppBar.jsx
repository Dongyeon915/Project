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
            backgroundColor:"#6A8A87"
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
            <Avatar alt="유저이미지" src={GitUser.avatar_url}
                    sx={{width: 30, height: 30}}/>
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
