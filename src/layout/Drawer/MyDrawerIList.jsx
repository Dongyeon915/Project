import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {Avatar, Link, Stack, Typography} from "@mui/material";
import GitUser from "../../components/user-comp/GitUser";
import {LibraryBooks, MenuBook} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";

function MyDrawerIList() {
  return (
      <div>
        <Toolbar/>
        <List>
          <ListItem key="사용">
            <ListItemButton>
              <Stack direction={"row"} spacing={3}>
                <Avatar alt="유저이미지" src={GitUser.avatar_url}
                        sx={{width: 60, height: 60}}/>
                <Stack spacing={1} justifyContent={"center"}>
                  <Typography variant={"h6"}>
                    {GitUser.name}
                  </Typography>
                  <Typography variant={"body1"}>
                    {GitUser.campany}
                  </Typography>
                  <Typography variant={"body2"}>
                    {GitUser.location}
                  </Typography>
                </Stack>
              </Stack>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider/>
        <List>
          {
            ['Overview', 'Repositories'].map((text, index) => (
                <Link component={RouterLink} to={"/repository"}
                      underline={"none"} color={"black"}>
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <MenuBook/> : <LibraryBooks/>}
                      </ListItemIcon>
                      <ListItemText primary={text}/>
                    </ListItemButton>
                  </ListItem>
                </Link>
            ))
          }
        </List>
      </div>
  )
}

export default MyDrawerIList
