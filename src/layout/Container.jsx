import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MyAppBar from "./AppBar/MyAppBar";
import MyDrawer from "./Drawer/MyResponsiveDrawer";
import ContentContainer from "./ContentContainer";


function Container() {

  //  content 영역
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
      <Box sx={{display: 'flex', backgroundColor: "#F3EED9",minHeight: 800}}>
        <CssBaseline/>
        <MyAppBar handleDrawerToggle={handleDrawerToggle}/>
        <MyDrawer handleDrawerToggle={handleDrawerToggle}
                  mobileOpen={mobileOpen}/>
        <ContentContainer/>
      </Box>
  );
}

export default Container;
