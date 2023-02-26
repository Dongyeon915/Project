import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import * as React from "react";
import UserProfile from "../../components/user-comp/UserProfile";
import {Avatar, Stack, Typography} from "@mui/material";
import GitUser from "../../components/user-comp/GitUser";

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
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={text}/>
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </div>
  )
}

export default MyDrawerIList
