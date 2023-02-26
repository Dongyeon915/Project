import Drawer from "@mui/material/Drawer";
import MyDrawerIList from "./MyDrawerIList";
import Box from "@mui/material/Box";
import * as React from "react";

function MyDrawer({handleDrawerToggle, mobileOpen}) {

  return (
      <Box
          component="nav"
          sx={{width: {sm: 240}, flexShrink: {sm: 0}}}
          aria-label="mailbox folders"
      >
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: {xs: 'block', sm: 'none'},
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 240
              },
            }}
        >
          <MyDrawerIList/>
        </Drawer>
        <Drawer
            variant="permanent"
            sx={{
              display: {xs: 'none', sm: 'block'},
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 240
              },
            }}
            open
        >
          <MyDrawerIList/>
        </Drawer>
      </Box>
  )
}

export default MyDrawer
