import {AppBar, Avatar, IconButton, Toolbar, Typography} from "@mui/material";
import * as React from "react";
import {GitHub} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import Box from "@mui/material/Box";
import {red} from "@mui/material/colors";
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
          {/*<IconButton>*/}
          {/*  <Avatar alt="유저이미지" src={GitUser.avatar_url}*/}
          {/*          sx={{width: 30, height: 30}}/>*/}
          {/*</IconButton>*/}

            <img  width={200} height={70} src={`${process.env.PUBLIC_URL}/finalLogo.png`}/>

          {/*<Typography variant={"h4"} sx={{flexGrow: 1,fontFamily: "Oswald",color:"black"}}>Daily Planner Pro</Typography>*/}
          <IconButton>
            {/*<Avatar alt={"Github Profile Image"} src={GitUser.avatar_url}/>*/}
          </IconButton>
        </Toolbar>
      </AppBar>
  )
}

export default MyAppBar
